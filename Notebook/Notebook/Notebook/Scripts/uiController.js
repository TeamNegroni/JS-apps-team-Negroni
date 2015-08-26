var currentDate = new Date();
$("#current-date").attr('placeholder', currentDate.getDate() + "/"
    + currentDate.getMonth() + "/" + currentDate.getFullYear());
$(function () {
    $("#date-picker").datepicker();
});
