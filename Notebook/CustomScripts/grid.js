var index = 1;
var $grid = $('#grid'),
    $adderSign = $('#adder-sign');
var $inputTypes = $('#input-type-wrapper');
var $inputTypeImage = $('#input-type-image');
var $inputTypeTextarea = $('#input-type-textarea');
var $inputTypeIssueNote = $('#input-type-issue-note');
var $inputTypeMeetingNote = $('#input-type-meeting-note');
var $inputTypeBankNote = $('#input-type-bank-note');
var $inputTypeShoppingNote = $('#input-type-shopping-note');

$grid.sortable({
    containment: 'parent',
    items: 'li:not(#gridAdder)',
    cursor: 'move',
    revert: true,
    scroll: true,
    tolerance: 'pointer',
    placeholder: "sortable-placeholderPiece",
    forcePlaceholderSize: true
});

function generateNoteDiv(id) {
    var noteDiv = $('<div/>').attr('class', 'note' + id);
    var noteTitle = $('<input/>').attr('class', 'note-title').attr('placeholder', 'Title');
    var noteContent = $('<textarea/>').attr('rows', '3').attr('cols', '22').attr('class', 'note-content').attr('placeholder', 'Content');

    noteDiv.append(noteTitle);
    noteDiv.append(noteContent);

    return noteDiv;
}

function generateIssueNoteExternal(id, day) {
    var $newPiece = $('<li/>');
    $newPiece.attr('data-id', id);
    var noteBody = generateNoteDiv(index);
    var noteClassName = '.note' + index;
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    var issueSpecs = $('<div/>').html('<div class="input-group-addon">Issue</div>' +
    '<input type="text" class="form-control note-issue" placeholder="Description">');

    noteBody.append(issueSpecs);

    $iconRemove.on('click', function () {
        deleteNote($newPiece);
        $(this).parent().fadeOut(300, function () {
            $(this).remove();
        });
    });

    $iconSave.on('click', function (event) {
        var $this = $(this);
        var $note = $(noteClassName);
        var $title = $note.find('.note-title');
        var $content = $note.find('.note-content');
        var $issue = $note.find('.note-issue');

        ($('<div/>')).addClass('note-title-text').html('Title:' + $title.val()).insertBefore($this);
        ($('<div/>')).addClass('note-content-text').html('Content:' + $content.val()).insertBefore($this);
        ($('<div/>')).addClass('note-issue-text').html('Issue:' + $issue.val()).insertBefore($this);

        var MyIssueNote = module.getIssueNote($title.val(), $content.val(), $issue.val());
        var user = Parse.User.current();
        var Note = Parse.Object.extend("Note");
        var storedNote = new Note({
            idNumber: MyIssueNote.id,
            title: MyIssueNote.title,
            content: MyIssueNote.content,
            issue: MyIssueNote.issue,
            user: user
        });

        storedNote.save(null, {
            success: function (storedNote) {
                console.log("successfully saved");

            },
            error: function (storedNote, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });

    $newPiece.addClass('gridPiece').addClass('external-issue' + index);
    $newPiece.text(index);
    index += 1;
    console.log('external index:' + index)
    $newPiece.resizable({
        grid: [362, 362], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });

    $newPiece.append($iconRemove);
    //$newPiece.append(noteBody);
    //$newPiece.append($iconSave);
    $newPiece.hide();
    $newPiece.insertBefore('#gridAdder');
    $newPiece.show(500);
}

function generateMeetingNoteExternal(id) {
    var $newPiece = $('<li/>');
    var noteBody = generateNoteDiv(index);
    var noteClassName = '.note' + index;
    $newPiece.attr('data-id', id);
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    var meetingSpecs = $('<div/>').html('<div class="input-group-addon">Place</div>' +
                         '<input type="text" class="form-control meeting-place" placeholder="Place">' +
                         '<div class="input-group-addon">Hour</div>' +
                         '<input type="text" class="form-control meeting-hour" id="datepicker" placeholder="">');

    noteBody.append(meetingSpecs);

    $iconRemove.on('click', function () {
        deleteNote($newPiece);
        $(this).parent().fadeOut(300, function () {
            $(this).remove();
        });
    });

    $iconSave.on('click', function (event) {
        var $this = $(this);
        var $note = $(noteClassName);
        var $title = $note.find('.note-title');
        var $content = $note.find('.note-content');
        var $place = $note.find('.meeting-place');
        var $hour = $note.find('.meeting-hour');

        ($('<div/>')).addClass('note-title-text').html('Title:' + $title.val()).insertBefore($this);
        ($('<div/>')).addClass('note-content-text').html('Content:' + $content.val()).insertBefore($this);
        ($('<div/>')).addClass('meeting-place-text').html('Place:' + $place.val()).insertBefore($this);
        ($('<div/>')).addClass('meeting-hour-text').html('Hour:' + $hour.val()).insertBefore($this);

        var MyMeetingNote = module.getMeetingNote($title.val(), $content.val(), $place.val(), $hour.val());
        var user = Parse.User.current();
        var Note = Parse.Object.extend("Note");
        var storedNote = new Note({
            idNumber: MyMeetingNote.id,
            title: MyMeetingNote.title,
            content: MyMeetingNote.content,
            place: MyMeetingNote.place,
            hour: MyMeetingNote.hour,
            user: user
        });

        storedNote.save(null, {
            success: function (storedNote) {
                console.log("successfully saved");
            },
            error: function (storedNote, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });

    $newPiece.addClass('gridPiece').addClass('external-meeting' + index);
    $newPiece.text(index);
    index += 1;

    $newPiece.resizable({
        grid: [362, 362], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });


    $newPiece.append($iconRemove);
    //$newPiece.append(noteBody);
    //$newPiece.append($iconSave);
    $newPiece.hide();
    $newPiece.insertBefore('#gridAdder');
    $newPiece.show(500);
}

function generateBankNoteExternal(id) {
    var $newPiece = $('<li/>');
    var noteBody = generateNoteDiv(index);
    var noteClassName = '.note' + index;
    $newPiece.attr('data-id', id);
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    var bankSpecs = $('<div/>').html('<div class="input-group-addon">Amount in $</div>' +
                   '<input type="text" class="form-control bank-note-amount" id="exampleInputAmount" placeholder="Amount">');

    noteBody.append(bankSpecs);

    $iconRemove.on('click', function () {
        deleteNote($newPiece);
        $(this).parent().fadeOut(300, function () {
            $(this).remove();
        });
    });

    $iconSave.on('click', function (event) {
        var $this = $(this);
        var $note = $(noteClassName);
        var $title = $note.find('.note-title');
        var $content = $note.find('.note-content');
        var $amount = $note.find('.bank-note-amount');

        ($('<div/>')).addClass('note-title-text').html('Title:' + $title.val()).insertBefore($this);
        ($('<div/>')).addClass('note-content-text').html('Content:' + $content.val()).insertBefore($this);
        ($('<div/>')).addClass('bank-note-amount-text').html('Amount:' + $amount.val()).insertBefore($this);

        var MyBankNote = module.getBankNote($title.val(), $content.val(), $amount.val());
        var user = Parse.User.current();
        var Note = Parse.Object.extend("Note");
        var storedNote = new Note({
            idNumber: MyBankNote.id,
            title: MyBankNote.title,
            content: MyBankNote.content,
            amount: MyBankNote.amount,
            user: user
        });

        storedNote.save(null, {
            success: function (storedNote) {
                console.log("successfully saved");
            },
            error: function (storedNote, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });

    $newPiece.addClass('gridPiece').addClass('external-bank' + index);
    $newPiece.text(index);
    index += 1;

    $newPiece.resizable({
        grid: [362, 362], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });

    $newPiece.append($iconRemove);
    //$newPiece.append(noteBody);
    //$newPiece.append($iconSave);
    $newPiece.hide();
    $newPiece.insertBefore('#gridAdder');
    $newPiece.show(500);
}

function generatePreviouslyCreatedIssues(existingIssueNote) {
    var $element = $('#gridAdder').prev();
    ($('<div/>')).addClass('note-title-text').html('Title:' + existingIssueNote.get('title')).appendTo($element);
    ($('<div/>')).addClass('note-content-text').html('Content:' + existingIssueNote.get('content')).appendTo($element);
    ($('<div/>')).addClass('note-issue-text').html('Issue:' + existingIssueNote.get('issue')).appendTo($element);
}

function generatePreviouslyCreatedMeetings(existingMeetingNote) {
    var $element = $('#gridAdder').prev();
    //console.log(existingMeetingNote.get('title'));
    //console.log('my meet' + $parent.html());
    ($('<div/>')).addClass('note-title-text').html('Title:' + existingMeetingNote.get('title')).appendTo($element);
    ($('<div/>')).addClass('note-content-text').html('Content:' + existingMeetingNote.get('content')).appendTo($element);
    ($('<div/>')).addClass('meeting-place-text').html('Place:' + existingMeetingNote.get('place')).appendTo($element);
    ($('<div/>')).addClass('meeting-hour-text').html('Hour:' + existingMeetingNote.get('hour')).appendTo($element);
}

function generatePreviouslyCreatedBanks(existingBankNote) {
    var $element = $('#gridAdder').prev();
    ($('<div/>')).addClass('note-title-text').html('Title:' + existingBankNote.get('title')).appendTo($element);
    ($('<div/>')).addClass('note-content-text').html('Content:' + existingBankNote.get('content')).appendTo($element);
    ($('<div/>')).addClass('bank-note-amount-text').html('Amount:' + existingBankNote.get('amount')).appendTo($element);
}
 
function generateTextArea() {
    var $newPiece = $('<li/>');
    var $textArea = $('<textarea/>').addClass('form-control').attr('row', 3).css('max-width', 300);
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');

    $iconRemove.on('click', function () {
        $(this).parent().fadeOut(300, function () { $(this).remove(); });
    });

    $newPiece.addClass('gridPiece');
    $newPiece.text(index);
    index += 1;

    $newPiece.resizable({
        grid: [362, 362], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });

    $newPiece.append($iconRemove);
    $newPiece.append($textArea);
    $newPiece.hide();
    $newPiece.insertBefore('#gridAdder');
    $newPiece.show(500);
    $inputTypes.hide(200);
    $adderSign.show(200);
}

function generateImageInput() {
    var $newPiece = $('<li/>');
    var $input = $('<input/>').attr('type', 'file').attr('accept', 'image/x-png, image/gif, image/jpeg');
    var $span = $('<span/>').addClass('file-input').addClass('btn').addClass('btn-primary').addClass('btn-file').html('Browse').append($input);
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');

    $iconRemove.on('click', function () {
        $(this).parent().fadeOut(300, function () { $(this).remove(); });
    });

    $newPiece.addClass('gridPiece');
    $newPiece.text(index);
    index += 1;

    $newPiece.resizable({
        grid: [362, 362], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });

    $newPiece.append($iconRemove);
    $newPiece.append($span);
    $newPiece.hide();
    $newPiece.insertBefore('#gridAdder');
    $newPiece.show(500);
    $inputTypes.hide(200);
    $adderSign.show(200);
}

$adderSign.on('click', function () {
    $adderSign.hide(200);
    $inputTypes.show(200);
});

$inputTypeTextarea.on('click', function () {
    generateTextArea();
});

$inputTypeImage.on('click', function () {
    generateImageInput();
 });

$inputTypeIssueNote.on('click', function () {
     var $this = $(this);
     var $newPiece = $('<li/>');
     var noteBody = generateNoteDiv(index);
     var noteClassName = '.note' + index;
     var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
     var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
     var issueSpecs = $('<div/>').html('<div class="input-group-addon">Issue</div>' +
     '<input type="text" class="form-control note-issue" placeholder="Description">');
     var day = sessionStorage.getItem('date');

     noteBody.append(issueSpecs);

     $iconRemove.on('click', function () {
         deleteNote($newPiece);
         $(this).parent().fadeOut(300, function () { $(this).remove(); });
     });

     $iconSave.on('click', function (event) {
         var $this = $(this);
         var $note = $(noteClassName);
         var $title = $note.find('.note-title');
         var $content = $note.find('.note-content');
         var $issue = $note.find('.note-issue');

         noteBody.remove();
         issueSpecs.remove();
         $iconSave.hide();

         ($('<div/>')).addClass('note-title-text').html('Title:' + $title.val()).insertBefore($this);
         ($('<div/>')).addClass('note-content-text').html('Content:' + $content.val()).insertBefore($this);
         ($('<div/>')).addClass('note-issue-text').html('Issue:' + $issue.val()).insertBefore($this);

         var MyIssueNote = module.getIssueNote($title.val(), $content.val(), $issue.val());
         var user = Parse.User.current();
         var Note = Parse.Object.extend("Note");
         var storedNote = new Note({
             idNumber: MyIssueNote.id,
             title: MyIssueNote.title,
             content: MyIssueNote.content,
             issue: MyIssueNote.issue,
             user: user,
             noteDayOfCreation: day
             });

         user.addUnique("dataStored", storedNote);
         user.save();
         // console.log(user.get("dataStored"));
         storedNote.save(null, {
             success:function(storedNote){
                 $newPiece.attr('data-id', storedNote.id);
                 console.log("successfully saved");
             },
             error:function(storedNote,error){
                 alert("Error: " + error.code + " " + error.message);
             }
         });
     });

     $newPiece.addClass('gridPiece');
     $newPiece.text(index);
     index += 1;
     console.log('$inputTypeIssueNote:' + index);
     $newPiece.resizable({
         grid: [362, 362], // value to be edited
         autoHide: true,
         animate: true,
         helper: "resizable-helperPiece",
         animateEasing: "easeInOutQuint"
     });

     $newPiece.append($iconRemove);
     $newPiece.append(noteBody);
     $newPiece.append($iconSave);
     $newPiece.hide();
     $newPiece.insertBefore('#gridAdder');
     $newPiece.show(500);
     $inputTypes.hide(200);
     $adderSign.show(200);
 });
    
$inputTypeMeetingNote.on('click', function () {
    var $newPiece = $('<li/>');
    var noteBody = generateNoteDiv(index);
    var noteClassName = '.note' + index;
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    var meetingSpecs = $('<div/>').html('<div class="input-group-addon">Place</div>' +
    '<input type="text" class="form-control meeting-place" placeholder="Place">' +
    '<div class="input-group-addon">Hour</div>' +
    '<input type="text" class="form-control meeting-hour" id="datepicker" placeholder="">');
    var day = localStorage.getItem('date');

    noteBody.append(meetingSpecs);

    $iconRemove.on('click', function () {
        deleteNote($newPiece);
        $(this).parent().fadeOut(300, function () { $(this).remove(); });
    });

    $iconSave.on('click', function (event) {
        var $this = $(this);
        var $note = $(noteClassName);
        var $title = $note.find('.note-title');
        var $content = $note.find('.note-content');
        var $place = $note.find('.meeting-place');
        var $hour = $note.find('.meeting-hour');

        noteBody.remove();
        meetingSpecs.remove();
        $iconSave.hide();

        ($('<div/>')).addClass('note-title-text').html('Title:' + $title.val()).insertBefore($this);
        ($('<div/>')).addClass('note-content-text').html('Content:' + $content.val()).insertBefore($this);
        ($('<div/>')).addClass('meeting-place-text').html('Place:' + $place.val()).insertBefore($this);
        ($('<div/>')).addClass('meeting-hour-text').html('Hour:' + $hour.val()).insertBefore($this);

        var MyMeetingNote = module.getMeetingNote($title.val(), $content.val(), $place.val(), $hour.val());
        var user = Parse.User.current();
        var Note = Parse.Object.extend("Note");
        var storedNote = new Note({
            idNumber: MyMeetingNote.id,
            title: MyMeetingNote.title,
            content: MyMeetingNote.content,
            place: MyMeetingNote.place,
            hour: MyMeetingNote.hour,
            user: user,
            noteDayOfCreation: day
        });

        user.addUnique("dataStored", storedNote);
        user.save();

        storedNote.save(null, {
            success: function (storedNote) {
                $newPiece.attr('data-id', storedNote.id);
                console.log("successfully saved");
            },
            error: function (storedNote, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });

    $newPiece.addClass('gridPiece');
    $newPiece.text(index);
    index += 1;

    $newPiece.resizable({
        grid: [362, 362], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });

    $newPiece.append($iconRemove);
    $newPiece.append(noteBody);
    $newPiece.append($iconSave);
    $newPiece.hide();
    $newPiece.insertBefore('#gridAdder');
    $newPiece.show(500);
    $inputTypes.hide(200);
    $adderSign.show(200);
});

$inputTypeBankNote.on('click', function () {
    var $newPiece = $('<li/>');
    var noteBody = generateNoteDiv(index);
    var noteClassName = '.note' + index;
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    var bankSpecs = $('<div/>').html('<div class="input-group-addon">Amount in $</div>' +
                    '<input type="text" class="form-control bank-note-amount" id="exampleInputAmount" placeholder="Amount">');
    var day = localStorage.getItem('date');
    noteBody.append(bankSpecs);

    $iconRemove.on('click', function () {
        deleteNote($newPiece);
        $(this).parent().fadeOut(300, function () { $(this).remove(); });
    });

    $iconSave.on('click', function (event) {
        var $this = $(this);
        var $note = $(noteClassName);
        var $title = $note.find('.note-title');
        var $content = $note.find('.note-content');
        var $amount = $note.find('.bank-note-amount');

        noteBody.remove();
        bankSpecs.remove();
        $iconSave.hide();

        ($('<div/>')).addClass('note-title-text').html('Title:' + $title.val()).insertBefore($this);
        ($('<div/>')).addClass('note-content-text').html('Content:' + $content.val()).insertBefore($this);
        ($('<div/>')).addClass('bank-note-amount-text').html('Amount:' + $amount.val()).insertBefore($this);

        var MyBankNote = module.getBankNote($title.val(), $content.val(), $amount.val());
        var user = Parse.User.current();
        var Note = Parse.Object.extend("Note");
        var storedNote = new Note({
            idNumber: MyBankNote.id,
            title: MyBankNote.title,
            content: MyBankNote.content,
            amount: MyBankNote.amount,
            user: user,
            noteDayOfCreation: day
        });

        user.addUnique("dataStored", storedNote);
        user.save();

        storedNote.save(null, {
            success: function (storedNote) {
                $newPiece.attr('data-id', storedNote.id);
                console.log("successfully saved");
            },
            error: function (storedNote, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });

    $newPiece.addClass('gridPiece');
    $newPiece.text(index);
    index += 1;

    $newPiece.resizable({
        grid: [362, 362], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });

    $newPiece.append($iconRemove);
    $newPiece.append(noteBody);
    $newPiece.append($iconSave);
    $newPiece.hide();
    $newPiece.insertBefore('#gridAdder');
    $newPiece.show(500);
    $inputTypes.hide(200);
    $adderSign.show(200);
});

$(document).on('change', '.btn-file :file', function () {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function () {
    $('.btn-file :file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }
    });
});


function deleteNote($newPiece) {
    var currentUser = Parse.User.current();
    var searchedId = $newPiece.attr('data-id');
    var collection = currentUser.get('dataStored');
    currentUser.set("dataStored", []);
    currentUser.save();
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].id != searchedId) {
            var Note = Parse.Object.extend("Note");
            var query = new Parse.Query(Note);
            query.get(collection[i].id, {
                success: function (Note) {
                    currentUser.addUnique("dataStored", Note);
                    currentUser.save();
                },
                error: function (object, error) {
                    console.log('error:' + error);
                }
            });
        }
    }
}

