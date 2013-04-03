//= require modernizr
//= require jquery.ui.datepicker
//= require jquery-ui-timepicker-addon
//= require iso8601.min

function dateInputPolyfill() {
  if (!Modernizr.inputtypes.date) {
    $("input[type='date']").each(function () {
      var alt = $("<input type=hidden>")
        .val($(this).val())
        .attr({name: $(this).attr('name')})
      .insertBefore(this);

      $(this)
        .removeAttr('name')
        .removeAttr('value')
        .datepicker({altField: alt, altFormat: "yy-mm-dd"})
      .datepicker('setDate', $.datepicker.parseDate("yy-mm-dd", $(alt).val()));
    });
  }

  if(!Modernizr.inputtypes.datetime) {
    $("input[type='datetime']").each(function () {
      var alt = $("<input type=hidden>")
        .val($(this).val())
        .attr({name: $(this).attr('name')})
      .insertBefore(this);

      $(this)
        .removeAttr('name')
        .removeAttr('value')
        .datetimepicker({altField: alt, altFieldTimeOnly: false, altFormat: "yy-mm-dd", dateFormat: "yy-mm-dd", useLocalTimezone: true})
      .datetimepicker('setDate', new Date(Date.parse($(alt).val())));
    });
  }
}

$(document).ready(function () {
  dateInputPolyfill();
});
