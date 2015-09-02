var $signUpFieldUsername = $('.form-sign-up .form-sign-up-username');
var $signUpFieldEmail = $('.form-sign-up .email');
var $signUpButton = $('.form-sign-up .btn-sign-up');
var $signUpBackToSignInButton = $('.form-sign-up .btn-go-back-to-sign-in');
var $signUpFieldPasswordInitial = $('.form-sign-up .passwordInitial');
var $signUpFieldPasswordConfirmed = $('.form-sign-up .passwordConfirmed');
var $register = $('.register');
var $formSignUp = $('#id-form-sign-up');
var $textSignUp = $('.text-center .sign-up');

var $signInFieldUsername = $('.form-sign-in .form-sign-in-username');
var $signInFieldPassword = $('.form-sign-in .form-sign-in-password');
var $signInButton = $('#login-wrapper .form-sign-in-button');

var $container = $("#container");
var $logOut = $('#logOutButton');

var $invalidPassword = $('<div/>').html('Invalid password');

var $iconSave = $('span.glyphicon.glyphicon-ok')
var counter = 0;

$register.on('click', function (ev) {
    var $this = $(this);
    var $formSignin = $('.form-sign-in');
    var $formSignUp = $('.form-sign-up');
    $formSignin.css('display', 'none');
    $formSignUp.css('display', 'inline-block');
    $this.css('display', 'none');
});

$signUpButton.on('click', function (event) {
    event.preventDefault();
    var loggedInUser = Parse.User.current();
    Parse.User.logOut();
    console.log($signUpFieldUsername.val());
    console.log($signUpFieldPasswordInitial.val());
    //User.signUp($signUpFieldUsername.val(),$signUpFieldPasswordInitial.val()) ;
    var user = new Parse.User();
    var init = $signUpFieldPasswordInitial.val();
    var confirmed = $signUpFieldPasswordConfirmed.val();
    var today = new Date();
    localStorage.setItem('date', today);
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
    var today = new Date();
    localStorage.setItem('date', today);
    loggedInUser = Parse.User.current();
    if (!loggedInUser) {
        Parse.User.logIn($signInFieldUsername.val(), $signInFieldPassword.val(), {
            success: function (user) {
                saveCurrentUserSession($signInFieldUsername.val());
                displayData();

                //console.log(user.get('username'));
                var collection = user.get('dataStored');
                for (var i = 1; i <= collection.length; i++) {
                    var Note = Parse.Object.extend("Note");
                    var query = new Parse.Query(Note);
                    queryObjects(query, collection[i - 1].id);
                }

                // var compoundQuery = Parse.Query.or(issueQuery, meetingQuery);
                // compoundQuery.equalTo("user", Parse.User.current());


                //function queryObjects(currentQuery, queryId) {
                //    currentQuery.equalTo("id",queryId);
                //    currentQuery.find({
                //        success: function (results) {
                //            alert("Successfully retrieved " + results.length + " objects.");
                //            for (var i = 1; i <= results.length; counter++, i++) {
                //                var object = results[i - 1];
                //                var issue = results[i - 1].get('issue');
                //                var place = results[i - 1].get('place');
                //                var amount = results[i - 1].get('amount');
                //                if (issue != undefined) {
                //                    generateIssueNoteExternal();
                //                    generatePreviouslyCreatedIssues(object, counter);
                //                } else if (place != undefined){
                //                    generateMeetingNoteExternal();
                //                    generatePreviouslyCreatedMeetings(object, counter);
                //                }else if (amount != undefined){
                //                    generateBankNoteExternal();
                //                    generatePreviouslyCreatedBanks(object, counter);
                //                }
                //            }
                //        },
                //        error: function (error) {
                //            alert("Error hnq: " + error.code + " " + error.message);
                //        }
                //    });
                //}

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
    window.location.reload(true);
});

// TODO: Add transitions, make it smooth
$signUpBackToSignInButton.on('click', function (ev) {
    var $formSignin = $('.form-sign-in');
    $invalidPassword.detach();
    $formSignUp.css('display', 'none');
    $register.css('display', 'none');
    $textSignUp.css('display', 'none');
    $formSignin.css('display', 'inline-block');
    $signInButton.css('display', 'inline-block');
    $register.css('display', 'inline-block');
});


function queryObjects(currentQuery, queryId) {
    currentQuery.get(queryId, {
        success: function (note) {
            var issue = note.get('issue');
            var place = note.get('place');
            var amount = note.get('amount');
            var noteDayOfCreation = note.get('noteDayOfCreation');
            var shortParsedNoteDayOfCreation = noteDayOfCreation.substring(4, 16);

            var storageDay = localStorage.getItem('date');
            var shortStorageDay = storageDay.substring(4, 16);

            // console.log('note calendar date ' + noteDayOfCreation);
            if (shortParsedNoteDayOfCreation === shortStorageDay) {
                if (issue != undefined) {
                    generateIssueNoteExternal(queryId, shortParsedNoteDayOfCreation);
                    generatePreviouslyCreatedIssues(note);
                } else if (place != undefined) {
                    generateMeetingNoteExternal(queryId, shortParsedNoteDayOfCreation);
                    generatePreviouslyCreatedMeetings(note);
                } else if (amount != undefined) {
                    generateBankNoteExternal(queryId, shortParsedNoteDayOfCreation);
                    generatePreviouslyCreatedBanks(note);
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


//var User = Parse.User;
//User.signUp('Don1', '1234')
//        .then(function(){
//            console.log('user registered');
//        });
//
//var TestObject = Parse.Object.extend("TestObject");
//var testObject = new TestObject();
//testObject.save({foo: "bar"}).then(function(object) {alert("yay! it worked");
//});