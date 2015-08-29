(function () {
    var $grid = $('#grid'),
        $adderSign = $('#adder-sign');
    var index = 1;
    var $inputTypes = $('#input-type-wrapper');
    var $inputTypeImage = $('.input-type-image');
    var $inputTypeTextarea = $('.input-type-textarea');
    var $inputTypeIssueNote = $('.input-type-issue-note');
    var $inputTypeMeetingNote = $('.input-type-meeting-note');
    var $inputTypeBankNote = $('.input-type-bank-note');
    var $inputTypeShoppingNote = $('.input-type-shopping-note');

    function generateNoteDiv() {
        var noteDiv = $('<div/>').attr('id', 'note');
        var noteTitle = $('<input/>');
        noteTitle.attr('id', 'note-title');
        noteTitle.attr('placeholder', 'Title');
        var noteContent = $('<textarea/>').attr('rows', '3').attr('cols', '22').attr('id', 'note-content').attr('placeholder', 'Content');


        noteDiv.append(noteTitle);
        noteDiv.append(noteContent);

        return noteDiv;
    }

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
        var $newPiece = $('<li/>');
        var noteBody = generateNoteDiv();
        var issueSpecs = $('<div/>').html('<div class="specific"><form class="form-inline"><div class="form-group">' +
            '<label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>' +
            '<div class="input-group"><div class="input-group-addon">Issue</div>' +
            '<input type="text" class="form-control" placeholder="Description"></div></div></form>' +
            '<button type="submit" class="btn btn-primary">Add</button></div>');
        var $iconRemove = $('<span/>').addClass('glyphicon').addClass('glyphicon-remove').attr('aria-hidden', 'true');
        var $iconSave = $('<span/>').addClass('glyphicon').addClass('glyphicon-ok').attr('aria-hidden', 'true');

        // Emo: Stopped for now because it makes the traversing over the DOM hard.
        // noteBody.append(issueSpecs);

        $iconRemove.on('click', function () {
            $(this).parent().fadeOut(300, function () { $(this).remove(); });;
        });

        $iconSave.on('click', function (event) {
            var $this = $(this);
            var $previous = $this.prev();
            console.log($previous.html());
            var MyIssueNote = module.getIssueNote('MyIssue', 'blqblq', 'golem problem');
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