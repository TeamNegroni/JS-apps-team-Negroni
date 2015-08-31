var $datePicker = $("#date-picker");
var $currentDateController = $("#current-date");
var currentDate = new Date();
var $dateControllerCheckbox = $('#date-controller-checkbox');
var $draggableComponents = $('.draggable-component');
var $draggablesShowBorder = $('#draggables-show-border');
var $inputAttribute = $('.input-attribute');
var $gridAdder = $('#gridAdder');
var $editControllerCheckbox = $('#edit-controller');

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

//Change modes from VIEW to EDIT
$editControllerCheckbox.change(function () {
    if ($(this).is(':checked')) {
        $gridAdder.hide(200);
    } else {
        $gridAdder.show(200);
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

function displayData(){
    var $nameTitle = $('#nameTitle');
    $logOut = $('#logOut');

    if(sessionStorage.getItem('sessionUser') === null){
        $('#login-wrapper').css({
            'display':'',
            'margin': '10em 30em'
        });
        $('#ui-wrapper').css('display', 'none');
        $logOut.css('display', 'none');
    }
    else{
        $('#login-wrapper').css('display', 'none');
        $('#ui-wrapper').css('display', 'block');
        $nameTitle.html('Hello, ' + sessionStorage.getItem('sessionUser'));
        $logOut.css('display', 'block');
    }
}

displayData();

document.onmouseup = activateInputAttributes;
document.onkeyup = activateInputAttributes;