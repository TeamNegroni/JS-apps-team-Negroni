var $container = $('#container');
var currentDate = new Date();
var $dateControllerCheckbox = $('#date-controller-checkbox');
var $draggableComponents = $('.draggable-component');
var $draggablesShowBorder = $('#draggables-show-border');
var $inputAttribute = $('.input-attribute');
var $gridAdder = $('#gridAdder');
var $adderSign = $('#adder-sign');
var $inputTypes = $('#input-type-wrapper');
var $calendarViewButton = $('#calendar-view-button');
var $calendar = $('#calendar');
var $loginWrapper = $('#login-wrapper');
var $controls = $('#controls');
var $uiWrapper = $('#ui-wrapper');
var $saveAllButton = $('#save-button');

//Control calendar-viewer
$calendarViewButton.on('click', function () {
    blurBackground(0, 5); // BLURRS THE BACKGROUND IMAGE
    blurBackground(0, 20, '#ui-wrapper');
    $('#calendar-blurrer').css('display', 'block');

    $calendar.css('opacity', '0');
    $calendar.css('display', 'block');

    $calendar.animate({
        opacity: '1'
    }, 500);
});

//
$saveAllButton.on('click', function () {
    var items = JSON.parse(localStorage.getItem('dataStored'));
    console.log(items);
    items.forEach(function (item) {
        var currentObjectId = item.objectId;
        console.log(currentObjectId);
        var MyIssueNote = module.getIssueNote($title.val(), $content.val(), $issue.val());
        //var user = Parse.User.current();
        //var Note = Parse.Object.extend("Note");
        //var storedNote = new Note({
        //    idNumber: MyIssueNote.id,
        //    title: MyIssueNote.title,
        //    content: MyIssueNote.content,
        //    issue: MyIssueNote.issue,
        //    user: user
        //});
//
        //storedNote.save(null, {
        //    success: function (storedNote) {
        //        console.log("successfully saved");
//
        //    },
        //    error: function (storedNote, error) {
        //        alert("Error: " + error.code + " " + error.message);
        //    }
        //});
    });
});

//$gridAdder.on('click', 'div:not(.input-type-buttons #input-type-wrapper)', function () {
//    $inputTypes.hide(200);
//    $adderSign.show(200);
//});

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
    $inputTypes.hide(200);
    $adderSign.show(200);

    if (sessionStorage.getItem('sessionUser') === null) {
        $uiWrapper.fadeOut(500);
        $loginWrapper.fadeIn(1500);
        setTimeout(function () {
            blurBackground(0, 15)
        }, 400);
    }
    else {
        $loginWrapper.fadeOut(500);
        $uiWrapper.css('display', 'inline-block');
        $controls.fadeIn(500);
        $('#input-wrapper').fadeIn(1700);

        if (sessionStorage.getItem('sessionUserAlreadyLoggedIn') === null) {
            blurBackground(15, 0);
            sessionStorage.setItem('sessionUserAlreadyLoggedIn', 'true');
        } else {
            setLocalDataStored();
        }

        drawDataStored();
        $('#show-selected-date').html(sessionStorage.getItem('date'));
        $nameTitle.html('Hello, ' + sessionStorage.getItem('sessionUser'));
    }

    function setLocalDataStored() {
        var loggedInUser = Parse.User.current();
        if (loggedInUser) {
            localStorage.setItem('dataStored', JSON.stringify(loggedInUser.get('dataStored')));
        }
    }
}

function blurBackground(fromRadius, toRadius, whatToBlur) {
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