//Controlling the date at the UI Pannel
var currentDate = new Date();
$("#current-date").attr('placeholder', currentDate.getDate() + "/"
    + currentDate.getMonth() + "/" + currentDate.getFullYear());

$(function () {
    $("#date-picker").datepicker();
});

$('#date-controller-checkbox').change(function () {
    if ($(this).is(':checked')) {
        $('#current-date').hide();
        $('#date-picker').show();
    } else {
        $('#current-date').show();
        $('#date-picker').hide();
    }
});
