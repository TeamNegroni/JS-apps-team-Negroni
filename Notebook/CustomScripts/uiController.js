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
var $calendarWrapper = $('#calendra-wrapper');
var $calendarViewer = $('.calendar-viewer');
var $calendar = $('#calendar');
var $calendarBlurrer = $('#calendar-blurrer');
var $loginWrapper = $('#login-wrapper');

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
    $logOut = $('#logOut');

    if (sessionStorage.getItem('sessionUser') === null) {
        blurBackground(0,15);
        $loginWrapper.fadeIn(1500);
    }
    else {
        $loginWrapper.css('display', 'none');
        $('#ui-wrapper').fadeIn(1500); // MIGHT NOT WORK PROPERLY, IF SO DO IT WITH $loginWrapper.fadeIn(500)

        $nameTitle.html('Hello, ' + sessionStorage.getItem('sessionUser'));
        $logOut.fadeIn(1000)
    }
}

//Control calendar-viewer
$calendarViewer.on('click', function () {
    $calendarWrapper.hide(200);
    $('#ui-wrapper').animate({
        display: 'none'
    }, 500);
    $logOut.animate({
        display: 'none'
    }, 500);
    blurBackground(0,15);
    $calendar.show(500);
    /*
     $calendarBlurrer.css({
     'display': 'block',
     'width': '1315',
     'height': '643',
     'position':'absolute',
     'top':0,
     'left':0,
     'background-color': 'gray',
     'opacity': '0.5'
     });*/
});

function blurBackground(fromRadius,toRadius) {
    setTimeout(function () {
        $({blurRadius: fromRadius}).animate({blurRadius: toRadius}, {
            duration: 200,
            easing: 'swing', // CAN BE CHANGED
            step: function () {
                $('#background-image').css({
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