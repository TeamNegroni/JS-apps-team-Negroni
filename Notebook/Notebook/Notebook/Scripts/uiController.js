var $datePicker = $("#date-picker");
var $currentDateController = $("#current-date");
var currentDate = new Date();
var $dateControllerCheckbox = $('#date-controller-checkbox');
var $draggableComponents = $('.draggable-component');
var $draggablesShowBorder = $('#draggables-show-border');

//Controlling the date at the UI Pannel
$currentDateController.attr('placeholder', currentDate.getDate() + "/"
    + currentDate.getMonth() + "/" + currentDate.getFullYear());

//Initiate datepicker
$(function () {
    $datePicker.datepicker();
});

//Change UI date of the note options
$dateControllerCheckbox.change(function () {
    if ($(this).is(':checked')) {
        $currentDateController.hide();
        $datePicker.show();
    } else {
        $currentDateController.show();
        $datePicker.hide();
    }
});

//Control draggables
$(function () {
    $draggableComponents.draggable({
        containment: "parent",
        cursor: "move"
    });
});

$draggablesShowBorder.click(function () {
    //hacked the validation for the border string using the debugger.
    if ($draggableComponents.css('border') === "0px none rgb(51, 51, 51)") {
        $draggableComponents.css('border', '1px solid rgb(193, 193, 193)');
    } else {
        $draggableComponents.css('border', '');
    }
});
