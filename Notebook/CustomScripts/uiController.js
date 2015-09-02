var $container = $('#container');
var $datePicker = $("#date-picker");
var $currentDateController = $("#current-date");
var currentDate = new Date();
var $dateControllerCheckbox = $('#date-controller-checkbox');
var $draggableComponents = $('.draggable-component');
var $draggablesShowBorder = $('#draggables-show-border');
var $inputAttribute = $('.input-attribute');
var $gridAdder = $('#gridAdder');
var $editControllerCheckbox = $('#edit-controller');
var WINDOW_WIDTH = window.innerWidth;
var WRAPPER_HEIGHT = $container.css('height');
var $calendarViewer = $('.calendar-viewer');
var $calendar = $('#calendar');
var $calendarBlurrer = $('#calendar-blurrer');
var $loginWrapper = $('#login-wrapper');
var $controls = $('#controls');

//Controlling the date at the UI Pannel
$currentDateController.attr('placeholder', currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear());

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

function displayData() {
    var $nameTitle = $('#nameTitle');
    $controls = $('#controls');

    if (sessionStorage.getItem('sessionUser') === null) {
        blurBackground(0,15);
        $loginWrapper.fadeIn(1500);
    }
    else {
        $loginWrapper.css('display', 'none');
        $('#ui-wrapper').css('display','inline-block');
        $('#input-wrapper').fadeIn(1700); // MIGHT NOT WORK PROPERLY, IF SO DO IT WITH $loginWrapper.fadeIn(500)
        $nameTitle.html('Hello, ' + sessionStorage.getItem('sessionUser'));
        $controls.fadeIn(500);
    }
}

//Control calendar-viewer
$calendarViewer.on('click', function () {
    $('#ui-wrapper').animate({
        display: 'none'
    }, 500);
    blurBackground(0,5); // BLURRS THE BACKGROUND IMAGE
    blurBackground(0,20,'#ui-wrapper');
    $('#calendar-blurrer').css('display','block');
    $calendar.show(500);
});

function blurBackground(fromRadius,toRadius,whatToBlur) {
    //debugger;
    whatToBlur = whatToBlur || '#background-image';
    setTimeout(function () {
        $({blurRadius: fromRadius}).animate({blurRadius: toRadius}, {
            duration: 300,
            easing: 'swing', // CAN BE CHANGED
            step: function () {
                $(whatToBlur).css({
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
            }
        });
    }, 500);
}

displayData();

document.onmouseup = activateInputAttributes;
document.onkeyup = activateInputAttributes;