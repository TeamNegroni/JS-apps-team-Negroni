var $formSignIn = $('#form-sign-in');
var $signInFieldUsername = $('#form-sign-in-username');
var $signInFieldPassword = $('#form-sign-in-password');
var $signInButton = $('#form-sign-in-button');
var $signUpButton = $('#sign-up-button');


var $formSignUp = $('#form-sign-up');
var $signUpFieldUsername = $formSignUp.find('.form-sign-up-username');
//var $signUpFieldEmail = $('.form-sign-up-email');
var $signUpFieldPasswordInitial = $formSignUp.find('#form-sign-up-passwordInitial');
var $signUpFieldPasswordConfirmed = $formSignUp.find('#form-sign-up-passwordConfirmed');
var $signUpFieldRegisterButton = $formSignUp.find('#form-sign-up-register-button');
var $signUpBackToSignInButton = $formSignUp.find('#already-registered-button');

var $container = $("#container");
var $logOut = $('#logOutButton');

var $invalidPassword = $('<div/>').html('Invalid password');

var counter = 0;
var $selectedDate = $('#show-selected-date');
var today = new Date();

$signUpFieldRegisterButton.on('click', function (event) {
    event.preventDefault();
    var loggedInUser = Parse.User.current();
    Parse.User.logOut();
    var user = new Parse.User();
    var init = $signUpFieldPasswordInitial.val();
    var confirmed = $signUpFieldPasswordConfirmed.val();
    updateMainDate(today);
    if (init == confirmed) {
        user.set("username", $signUpFieldUsername.val());
        user.set("password", $signUpFieldPasswordInitial.val());
        user.set("dataStored", []);
        //user.set("email", $signUpFieldEmail.val());
        user.signUp(null, {
            success: function (user) {
                saveCurrentUserSession($signUpFieldUsername.val());
                $invalidPassword.detach();
                displayData();
            },
            error: function (user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    } else {
        $container.prepend($invalidPassword);
        $signUpFieldPasswordInitial.val('');
        $signUpFieldPasswordConfirmed.val('');
        $signUpFieldPasswordInitial.focus();
    }
});

$signInButton.on('click', function (ev) {
    event.preventDefault();
    var $this = $(this);
    var loggedInUser = Parse.User.current();
    Parse.User.logOut();
    updateMainDate(today);
    loggedInUser = Parse.User.current();
    if (!loggedInUser) {
        Parse.User.logIn($signInFieldUsername.val(), $signInFieldPassword.val(), {
            success: function (user) {
                saveCurrentUserSession($signInFieldUsername.val());
                localStorage.setItem('dataStored', JSON.stringify(user.get('dataStored')));
                displayData();
            },
            error: function (user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    } else {
        console.log(loggedInUser.get("username"));
    }
});

$logOut.on('click', function (ev) {
    Parse.User.logOut();
    sessionStorage.clear();
    displayData();
    var $allPreviousElements = $('#gridAdder').prevAll();
    $allPreviousElements.remove();
});

// TODO: Add transitions, make it smooth
$signUpBackToSignInButton.on('click', function (ev) {
    $invalidPassword.detach();
    $formSignUp.css('display','none');
    $formSignIn.css('display','block');
});

$signUpButton.on('click',function(ev) {
    var $formSignIn = $('#form-sign-in'),
        $formSignUp = $('#form-sign-up');

    $invalidPassword.detach();
    $formSignIn.css('display','none');
    $formSignUp.css('display','block');
});

function updateMainDate(date) {
    date = date || today;
    sessionStorage.setItem('date', date.getDayName() + ' ' + date.getDate() + '-' + date.getMonthName() + '-' + date.getFullYear());
    var storageDay = sessionStorage.getItem('date');
    $selectedDate.html(storageDay);
}

function drawDataStored() {
    var collection = JSON.parse(localStorage.getItem('dataStored'));
    for (var i = 1; i <= collection.length; i++) {
        var Note = Parse.Object.extend("Note");
        var query = new Parse.Query(Note);
        queryObjects(query, collection[i - 1].objectId);
    }
}

function queryObjects(currentQuery, queryId) {
    currentQuery.get(queryId, {
        success: function (note) {
            var issue = note.get('issue');
            var place = note.get('place');
            var amount = note.get('amount');
            var textarea = note.get('content');
            var noteDayOfCreation = note.get('noteDayOfCreation');
            var storageDay = sessionStorage.getItem('date');
            // console.log('note calendar date ' + noteDayOfCreation);
            if (noteDayOfCreation === storageDay) {
                if (issue != undefined) {                              // ISSUE
                    generateIssueNoteExternal(queryId, noteDayOfCreation);
                    generatePreviouslyCreatedIssues(note);
                } else if (place != undefined) {
                    generateMeetingNoteExternal(queryId, noteDayOfCreation);
                    generatePreviouslyCreatedMeetings(note);
                } else if (amount != undefined) {                      // BANK
                    generateBankNoteExternal(queryId, noteDayOfCreation);
                    generatePreviouslyCreatedBanks(note);
                } else if (!issue && !place && !amount && textarea) {  // TEXT
                    generateTextArea(queryId, noteDayOfCreation);
                    generatePreviouslyCreatedTextArea(note);
                } else if (!issue && !place && !amount && !textarea) { // IMG
                    generateImageInput(queryId,noteDayOfCreation);
                    generatePreviouslyCreatedImage(note);
                }
            }
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
}

function saveCurrentUserSession(username) {
    if (typeof username === 'undefined' || username === null) {
        throw new Error('Incorrect username!');
    }

    sessionStorage.setItem('sessionUser', username);
}

(function() {
    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    Date.prototype.getMonthName = function () {
        return MONTH_NAMES[this.getMonth()];
    };

    Date.prototype.getDayName = function () {
        return WEEK_DAY_NAMES[this.getDay()];
    };
}());