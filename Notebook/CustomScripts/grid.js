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

function generateGridPieceBody(id, creationDate, type) {
    var $newPiece = $('<li/>'),
        day = sessionStorage.getItem('date');
    $newPiece.attr('data-id', id);
    $newPiece.attr('position-id', index);
    index += 1;
    $newPiece.attr('item-type', type);
    $newPiece.attr('creation-date', creationDate);
    $newPiece.addClass('gridPiece');
    $newPiece.resizable({
        grid: [257, 202], // value to be edited
        autoHide: true,
        animate: true,
        helper: "resizable-helperPiece",
        animateEasing: "easeInOutQuint"
    });

    var $iconsContainer = $('<div/>').addClass('icons-container');
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    $iconsContainer.append($iconSave);
    $iconsContainer.append($iconRemove);

    $iconSave.on('click', function (event) {
        saveItem(type);
    });

    $iconRemove.on('click', function () {
        deleteNote($newPiece);
        $(this).parent().parent().fadeOut(300, function () {
            $(this).remove();
        });
    });

    $newPiece.append($iconsContainer);
    return $newPiece;

    function saveItem(type) {
        var item,
            user = Parse.User.current();

        switch (type) {
            case 'issue':
                item = saveIssueNote();
                saveNoteOnServer(item)
                break;
            case 'meeting':
                item = saveMeetingNote();
                saveNoteOnServer(item)
                break;
            case 'bank':
                item = saveBankNote();
                saveNoteOnServer(item)
                break;
            case 'text':
                item = saveTextTile();
                saveNoteOnServer(item)
                break;
            case 'img':
                item = saveImgTile();
                saveNoteOnServer(item)
                break;
        }

        function saveNoteOnServer(item) {
            user.addUnique("dataStored", item);
            user.save();
            item.save(null, {
                success: function (storedNote) {
                    console.log("successfully saved");
                },
                error: function (storedNote, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }

        function saveIssueNote() {
            var $title = $newPiece.find('.note-title');
            var $content = $newPiece.find('.note-content');
            var $issue = $newPiece.find('.note-issue');
            var myNote = module.getIssueNote($title.val(), $content.val(), $issue.val());
            var Note = Parse.Object.extend("Note");
            return storedNote = new Note({
                idNumber: myNote.id,
                title: myNote.title,
                content: myNote.content,
                issue: myNote.issue,
                user: user,
                noteDayOfCreation: day
            });
        }

        function saveMeetingNote() {
            var $title = $newPiece.find('.note-title');
            var $content = $newPiece.find('.note-content');
            var $place = $newPiece.find('.meeting-place');
            var $hour = $newPiece.find('.meeting-hour');
            var MyMeetingNote = module.getMeetingNote($title.val(), $content.val(), $place.val(), $hour.val());
            var Note = Parse.Object.extend("Note");
            return storedNote = new Note({
                idNumber: MyMeetingNote.id,
                title: MyMeetingNote.title,
                content: MyMeetingNote.content,
                place: MyMeetingNote.place,
                hour: MyMeetingNote.hour,
                user: user,
                noteDayOfCreation: day
            });
        }

        function saveBankNote() {
            var $title = $newPiece.find('.note-title');
            var $content = $newPiece.find('.note-content');
            var $amount = $newPiece.find('.bank-note-amount');
            var MyBankNote = module.getBankNote($title.val(), $content.val(), $amount.val());
            var Note = Parse.Object.extend("Note");
            return storedNote = new Note({
                idNumber: MyBankNote.id,
                title: MyBankNote.title,
                content: MyBankNote.content,
                amount: MyBankNote.amount,
                user: user,
                noteDayOfCreation: day
            });
        }

        function saveTextTile() {

        }

        function saveImgTile() {
            var $this = $(this);
            var $input = $newPiece.find('input');
            var MyImage = imageModule.getImage($input.val());
            var user = Parse.User.current();
            var Image = Parse.Object.extend("Image");
            return storedNote = new Image({
                user: user,
                source: MyImage.src,
                noteDayOfCreation: day
            });
        }
    }
}

function generateNoteContainer() {
    var $noteBodyContainer = $('<div/>').addClass('note-container');
    var $noteTitle = $('<input/>').addClass('note-title').attr('placeholder', 'Title');
    var $noteContent = $('<textarea/>').addClass('note-content').attr('placeholder', 'Content');

    $noteBodyContainer.append($noteTitle);
    $noteBodyContainer.append($noteContent);

    return $noteBodyContainer;
}

function addAndAnimateGridPiece($piece) {
    $piece.hide();
    $piece.insertBefore('#gridAdder');
    $piece.show(500);
}

function generateIssueNoteExternal(id, creationDate) {
    var $newPiece = generateGridPieceBody(id, creationDate, 'issue');
    var $noteBody = generateNoteContainer();

    var $issueSpecs = $('<div/>').html('<div class="input-group-addon">Issue</div>' +
        '<input type="text" class="form-control note-issue" placeholder="Description">');

    $noteBody.filter('.note-container').prepend($issueSpecs);
    $newPiece.append($noteBody);

    addAndAnimateGridPiece($newPiece);
}

function generateMeetingNoteExternal(id, creationDate) {
    var $newPiece = generateGridPieceBody(id, creationDate, 'meeting');
    var $noteBody = generateNoteContainer();

    var $meetingSpecs = $('<div/>').html('<div class="input-group-addon">Place</div>' +
        '<input type="text" class="form-control meeting-place" placeholder="Place">' +
        '<div class="input-group-addon">Hour</div>' +
        '<input type="text" class="form-control meeting-hour" id="datepicker" placeholder="">');

    $noteBody.filter('.note-container').prepend($meetingSpecs);
    $newPiece.append($noteBody);

    addAndAnimateGridPiece($newPiece);
}

function generateBankNoteExternal(id, creationDate) {
    var $newPiece = generateGridPieceBody(id, creationDate, 'bank');
    var $noteBody = generateNoteContainer();

    var $bankSpecs = $('<div/>').html('<div class="input-group-addon">Amount in $</div>' +
        '<input type="text" class="form-control bank-note-amount" id="exampleInputAmount" placeholder="Amount">');

    $noteBody.filter('.note-container').prepend($bankSpecs);
    $newPiece.append($noteBody);

    addAndAnimateGridPiece($newPiece);
}

function generatePreviouslyCreatedIssues(existingIssueNote) {
    var $element = $('#gridAdder').prev();
    $element.find('.note-title').html(existingIssueNote.get('title'));
    $element.find('.note-content').html(existingIssueNote.get('content'));
    $element.find('.note-issue').html(existingIssueNote.get('issue'));
}

function generatePreviouslyCreatedMeetings(existingMeetingNote) {
    var $element = $('#gridAdder').prev();
    //console.log(existingMeetingNote.get('title'));
    //console.log('my meet' + $parent.html());
    $element.find('note-title-text').html(existingMeetingNote.get('title'));
    $element.find('note-content-text').html(existingMeetingNote.get('content'));
    $element.find('meeting-place-text').html(existingMeetingNote.get('place'));
    $element.find('meeting-hour-text').html(existingMeetingNote.get('hour'));
}

function generatePreviouslyCreatedBanks(existingBankNote) {
    var $element = $('#gridAdder').prev();
    $element.find('note-title-text').html(existingBankNote.get('title'));
    $element.find('note-content-text').html(existingBankNote.get('content'));
    $element.find('bank-note-amount-text').html(existingBankNote.get('amount'));
}

function generateTextArea(id, creationDate) {
    var $newPiece = generateGridPieceBody(id, creationDate, 'text');

    var $textArea = $('<textarea/>').addClass('form-control').attr('row', 3).css('max-width', 300).addClass('text-tile');

    $newPiece.append($textArea);

    addAndAnimateGridPiece($newPiece);
}

function generateImageInput(id, creationDate) {
    var $newPiece = generateGridPieceBody(id, creationDate, 'img');

    var $input = $('<input/>').attr('type', 'file').attr('accept', 'image/x-png, image/gif, image/jpeg');
    var $span = $('<span/>').addClass('file-input').addClass('btn').addClass('btn-primary').addClass('btn-file').html('Browse').append($input);

    $newPiece.append($input);

    addAndAnimateGridPiece($newPiece);
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
    generateIssueNoteExternal();
});

$inputTypeMeetingNote.on('click', function () {
    generateMeetingNoteExternal();
});

$inputTypeBankNote.on('click', function () {
    var $newPiece = $('<li/>');
    var noteBody = generateNoteDiv(index);
    var noteClassName = '.note' + index;
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    var bankSpecs = $('<div/>').html('<div class="input-group-addon">Amount in $</div>' +
        '<input type="text" class="form-control bank-note-amount" id="exampleInputAmount" placeholder="Amount">');
    var day = sessionStorage.getItem('date');
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
    var collection = JSON.parse(localStorage.getItem('dataStored'));
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
    collection = currentUser.get('dataStored');
    localStorage.setItem("dataStored", JSON.stringify(collection));
}

