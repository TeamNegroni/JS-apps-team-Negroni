var $datePicker = $("#date-picker");
var $currentDateController = $("#current-date");
var currentDate = new Date();
var $dateControllerCheckbox = $('#date-controller-checkbox');
var $draggableComponents = $('.draggable-component');
var $draggablesShowBorder = $('#draggables-show-border');
var $inputAttribute = $('.input-attribute');

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

//Control selection menu
function GetSelectedText() {
    var selText = "";
    if (window.getSelection) {  // all browsers, except IE before version 9
        if (document.activeElement &&
                (document.activeElement.tagName.toLowerCase() == "textarea")) {
            var text = document.activeElement.value;
            selText = text.substring(document.activeElement.selectionStart,
                                      document.activeElement.selectionEnd);
        }
       // else {
       //     var selRange = window.getSelection();
       //     selText = selRange.toString();
       // }
    }
    else {
        if (document.selection.createRange) { // Internet Explorer
            var range = document.selection.createRange();
            selText = range.text;
        }
    }
    return selText;
}

function activateInputAttributes() {
    var selectedText = GetSelectedText();
    if (selectedText) {
        $inputAttribute.each(function () {
            $(this).removeAttr("disabled");
        });
    } else {
        $inputAttribute.each(function () {
            $(this).attr('disabled', 'disabled');
        });
    }
}

document.onmouseup = activateInputAttributes;
document.onkeyup = activateInputAttributes;