var index = 1;

function generateNoteDiv(id) {
    var noteDiv = $('<div/>').attr('class', 'note' + id);
    var noteTitle = $('<input/>').attr('class', 'note-title').attr('placeholder', 'Title');
    var noteContent = $('<textarea/>').attr('rows', '3').attr('cols', '22').attr('class', 'note-content').attr('placeholder', 'Content');

    noteDiv.append(noteTitle);
    noteDiv.append(noteContent);

    return noteDiv;
}

function generateIssueNoteExternal() {
    var $newPiece = $('<li/>');
    var noteBody = generateNoteDiv(index);
    var noteClassName = '.note' + index;
    var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
    var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
    var issueSpecs = $('<div/>').html('<div class="input-group-addon">Issue</div>' +
    '<input type="text" class="form-control note-issue" placeholder="Description">');

    noteBody.append(issueSpecs);

    $iconRemove.on('click', function () {
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
        var IssueNote = Parse.Object.extend("IssueNote");
        var storedNote = new IssueNote({
            idNumber: MyIssueNote.id,
            title: MyIssueNote.title,
            content: MyIssueNote.content,
            issue: MyIssueNote.issue,
            user: user
        });

        storedNote.save(null, {
            success: function (storedNote) {
                console.log("successfully saved")
            },
            error: function (storedNote, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    })

    $newPiece.addClass('gridPiece').addClass('external-issue');
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
}

function generatePreviouslyCreatedIssues(existingIssueNote) {
    var $parent = $('.external-issue');
    ($('<div/>')).addClass('note-title-text').html('Title:' + existingIssueNote.get('title')).appendTo($parent);
    ($('<div/>')).addClass('note-content-text').html('Content:' + existingIssueNote.get('content')).appendTo($parent);
    ($('<div/>')).addClass('note-issue-text').html('Issue:' + existingIssueNote.get('issue')).appendTo($parent);
}

(function () {
    var $grid = $('#grid'),
        $adderSign = $('#adder-sign');
    var $inputTypes = $('#input-type-wrapper');
    var $inputTypeImage = $('.input-type-image');
    var $inputTypeTextarea = $('.input-type-textarea');
    var $inputTypeIssueNote = $('.input-type-issue-note');
    var $inputTypeMeetingNote = $('.input-type-meeting-note');
    var $inputTypeBankNote = $('.input-type-bank-note');
    var $inputTypeShoppingNote = $('.input-type-shopping-note');      
    
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

    $adderSign.on('click', function () {
        $adderSign.hide(200);
        $inputTypes.show(200);
    });

    $inputTypeTextarea.on('click', function () {
        var $newPiece = $('<li/>');
        var $textArea = $('<textarea/>').addClass('form-control').attr('row', 3).css('max-width', 300);
        var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');

        $iconRemove.on('click', function () {
            $(this).parent().fadeOut(300, function(){ $(this).remove();});;
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
    });

    $inputTypeImage.on('click', function () {
        var $newPiece = $('<li/>');
        var $input = $('<input/>').attr('type', 'file').attr('accept', 'image/x-png, image/gif, image/jpeg');
        var $span = $('<span/>').addClass('file-input').addClass('btn').addClass('btn-primary').addClass('btn-file').html('Browse').append($input);
        var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');

        $iconRemove.on('click', function () {
            $(this).parent().fadeOut(300, function () { $(this).remove(); });;
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
    });

    $inputTypeIssueNote.on('click', function () {
        // Emo: Stopped for now because it makes the traversing over the DOM hard.
        //var issueSpecs = $('<div/>').html('<div class="specific"><form class="form-inline"><div class="form-group">' +
        //    '<label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>' +
        //    '<div class="input-group"><div class="input-group-addon">Issue</div>' +
        //    '<input type="text" class="form-control" placeholder="Description"></div></div></form>' +
        //    '<button type="submit" class="btn btn-primary">Add</button></div>');

        var $newPiece = $('<li/>');
        var noteBody = generateNoteDiv(index);
        var noteClassName = '.note' + index;
        var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
        var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');
        var issueSpecs = $('<div/>').html('<div class="input-group-addon">Issue</div>' +
        '<input type="text" class="form-control note-issue" placeholder="Description">')

        noteBody.append(issueSpecs);

        $iconRemove.on('click', function () {
            $(this).parent().fadeOut(300, function () { $(this).remove(); });;
        });

        $iconSave.on('click', function (event) {
            var $note = $(noteClassName);
            var $title = $note.find('.note-title');
            var $content = $note.find('.note-content');
            var $issue = $note.find('.note-issue');

            ($('<div/>')).addClass('note-title-text').html('Title:' + $title.val()).insertBefore($this);
            ($('<div/>')).addClass('note-content-text').html('Content:' + $content.val()).insertBefore($this);
            ($('<div/>')).addClass('note-issue-text').html('Issue:' + $issue.val()).insertBefore($this);

            var MyIssueNote = module.getIssueNote($title.val(), $content.val(), $issue.val());
            var user = Parse.User.current();
            var IssueNote = Parse.Object.extend("IssueNote")
            var storedNote = new IssueNote({
                idNumber: MyIssueNote.id,
                title: MyIssueNote.title,
                content: MyIssueNote.content,
                issue: MyIssueNote.issue,
                user: user
                });

            storedNote.save(null, {
                success:function(storedNote){
                    console.log("successfully saved")
                },
                error:function(storedNote,error){
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        })

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
}());

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