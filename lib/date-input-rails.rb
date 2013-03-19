require 'rails/engine'

module DateInputRails
  class Engine < ::Rails::Engine
  end
end

# Backports `ActionView::Helpers::FormHelper#date_field` & `datetime_field` and
# `ActionView::Helpers::FormTagHelper#date_field_tag` & `datetime_field_tag` from Rails 4.
# https://github.com/rails/rails/pull/5016 https://github.com/rails/rails/commit/b02d14aad515a039c284c93a68845503dc1658e2
require 'action_view'

module ActionView
  module Helpers
    module FormHelper
      def date_field(object_name, method, options = {})
        InstanceTag.new(object_name, method, self, options.delete(:object)).to_date_field_tag(options)
      end unless instance_methods.include?(:date_field)

      def datetime_field(object_name, method, options = {})
        InstanceTag.new(object_name, method, self, options.delete(:object)).to_datetime_field_tag(options)
      end unless instance_methods.include?(:datetime_field)
    end

    class InstanceTag
      def to_date_field_tag(options = {})
        options = options.stringify_keys
        options["value"] = options.fetch("value") { value(object).try(:to_date) }
        options["size"] = nil
        to_input_field_tag("date", options)
      end

      def to_datetime_field_tag(options = {})
	options = options.stringify_keys
	options["value"] = options.fetch("value") {format_global_date_time_string(value(object))}
	options["min"] = format_global_date_time_string(options["min"])
	options["max"] = format_global_date_time_string(options["max"])
	to_input_field_tag("datetime", options)
      end
      
      private
	def format_global_date_time_string(value)
		value.try(:strftime, "%Y-%m-%dT%T.%L%z")
	end
    end if defined?(InstanceTag)

    # http://blog.lrdesign.com/2011/04/extending-form_for-in-rails-3-with-your-own-methods/
    class FormBuilder
      def date_field(method, options = {})
        @template.date_field(@object_name, method, objectify_options(options))
      end unless instance_methods.include?(:date_field)

     def datetime_field(method, options = {})
        @template.datetime_field(@object_name, method, objectify_options(options))
      end unless instance_methods.include?(:datetime_field)
    end

    module FormTagHelper
      def date_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "date"))
      end unless instance_methods.include?(:date_field_tag)

      def datetime_field_tag(name, value = nil, options = {})
        text_field_tag(name, value, options.stringify_keys.update("type" => "datetime"))
      end unless instance_methods.include?(:datetime_field_tag)
    end
  end
end
