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
var $signInButton = $('.form-sign-in-button');

var $container = $(".container");

var $nameTitle = $('<div/>');
var $logoutButton = $('<button />').addClass('btn btn-lg btn-primary btn-block form-sign-in-button').html('Log Out');
var $logOut = $('<div/>').css({'width': '200px', 'margin-top': '10px'}).append($logoutButton);
var $invalidPassword = $('<div/>').html('Invalid password');

var $iconSave = $('span.glyphicon.glyphicon-ok')

$register.on('click', function(ev) {
    var $this = $(this);
    var $formSignin = $('.form-sign-in');
    var $formSignUp = $('.form-sign-up');
    $formSignin.css('display', 'none');
    $formSignUp.css('display', 'inline-block');
    $this.css('display', 'none');
});

$signUpButton.on('click', function(event) {
    event.preventDefault();
    var loggedInUser = Parse.User.current();
    Parse.User.logOut();
    console.log($signUpFieldUsername.val());
    console.log($signUpFieldPasswordInitial.val());
    //User.signUp($signUpFieldUsername.val(),$signUpFieldPasswordInitial.val()) ;
    var user = new Parse.User();
    var init = $signUpFieldPasswordInitial.val();
    var confirmed = $signUpFieldPasswordConfirmed.val();
    if (init == confirmed) {
        user.set("username", $signUpFieldUsername.val());
        user.set("password", $signUpFieldPasswordInitial.val());
        //user.set("email", $signUpFieldEmail.val());
        user.signUp(null, {
            success: function (user) {
                saveCurrentUserSession($signUpFieldUsername.val());
                $nameTitle.html('Logged in as ' + $signUpFieldUsername.val());
                $invalidPassword.detach();
                $container.prepend($logOut);
                $container.prepend($nameTitle);
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

$signInButton.on('click', function(ev) {
    event.preventDefault();
    var $this = $(this);


    var $formSignin = $('.form-sign-in');
    var loggedInUser = Parse.User.current();
    Parse.User.logOut();
    console.log($logOut.html());
    loggedInUser =  Parse.User.current();
    if(!loggedInUser){
        Parse.User.logIn($signInFieldUsername.val(), $signInFieldPassword.val(), {
            success: function(user) {
                saveCurrentUserSession($signInFieldUsername.val());
                displayData();
                $nameTitle.html('Logged in as ' + $signInFieldUsername.val());
                $container.prepend($logOut);
                $container.prepend($nameTitle);
                var IssueNote = Parse.Object.extend("IssueNote");
                var query = new Parse.Query(IssueNote);
                query.equalTo("user", Parse.User.current());
                query.find({
                    success: function(results) {
                        alert("Successfully retrieved " + results.length + " objects.");
                        for (var i = 1; i <= results.length; i++) {
                            var object = results[i - 1];
                            generateIssueNoteExternal();
                            generatePreviouslyCreatedIssues(object, i);
                            // alert(object.get('idNumber') +
                            //         ' ' + object.get('title') +
                            //         ' ' + object.get('content') +
                            //         ' ' + object.get('issue'));
                        }
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });

            },
            error: function(user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    } else {
        console.log(loggedInUser.get("username"));
    }
});

$logOut.on('click', function(ev) {
    $logOut.detach();
    $nameTitle.detach();
    //var $formSignin = $('.form-sign-in');
    Parse.User.logOut();
    sessionStorage.clear();
    displayData();
});

$signUpBackToSignInButton.on('click', function(ev) {
    var $formSignin = $('.form-sign-in');
    $invalidPassword.detach();
    $formSignUp.css('display', 'none');
    $register.css('display','none');
    $textSignUp.css('display', 'none');
    $formSignin.css('display', 'inline-block');
    $signInButton.css('display', 'inline-block');
    $register.css('display','inline-block');
});

function saveCurrentUserSession(username){
    if(typeof username === 'undefined' || username === null){
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