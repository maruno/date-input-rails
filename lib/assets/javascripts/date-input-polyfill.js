//= require modernizr
//= require jquery.ui.datepicker
//= require jquery-ui-timepicker-addon

if (!Modernizr.inputtypes.date) {
  $(document).ready(function () {
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
  });
}

if (!Modernizr.inputtypes.datetime) {
  $(document).ready(function () {
    $("input[type='datetime']").each(function () {
      var alt = $("<input type=hidden>")
        .val($(this).val())
        .attr({name: $(this).attr('name')})
      .insertBefore(this);

      $(this)
        .removeAttr('name')
        .removeAttr('value')
        .datetimepicker({altField: alt, altFieldTimeOnly: false, altFormat:"yy-mm-dd", useLocalTimezone: true})
      .datetimepicker('setDate', $.datepicker.parseDateTime("yy-mm-dd",'HH:mm', $(alt).val()));
    });
  });
}
