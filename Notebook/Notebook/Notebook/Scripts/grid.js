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


   // $adder.on('click', function () {
   //     var $newPiece = $('<li/>');
   //     $newPiece.addClass('gridPiece');
   //
   //     $newPiece.text(index);
   //     index += 1;
   //
   //     $newPiece.resizable({
   //         grid: [362, 362], // value to be edited
   //         autoHide: true,
   //         animate: true,
   //         helper: "resizable-helperPiece",
   //         animateEasing: "easeInOutQuint"
   //     });
   //
   //     $newPiece.hide();
   //     $newPiece.insertBefore('#gridAdder');
   //     $newPiece.show(500);
   // });
    //$inputType.each(function () {
    //    $(this).on('click', function () {
    //        var $newPiece = $('<li/>');
    //        $newPiece.addClass('gridPiece');
    //
    //        $newPiece.text(index);
    //        index += 1;
    //
    //        $newPiece.resizable({
    //            grid: [362, 362], // value to be edited
    //            autoHide: true,
    //            animate: true,
    //            helper: "resizable-helperPiece",
    //            animateEasing: "easeInOutQuint"
    //        });
    //
    //        $newPiece.hide();
    //        $newPiece.insertBefore('#gridAdder');
    //        $newPiece.show(500);
    //    });
    //})
    $adderSign.on('click', function () {
        $adderSign.hide(200);
        $inputTypes.show(200);
    });

    $inputTypeTextarea.on('click', function () {
        var $newPiece = $('<li/>');
        var $textArea = $('<textarea/>').addClass('form-control').attr('row', 3).css('max-width',300);
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

        $newPiece.append($span);
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