(function () {
    var $grid = $('#grid'),
        $adder = $('#gridAdder');
    var index = 1;
    var $inputType = $('.input-type');
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

    $inputTypeTextarea.on('click', function () {
        var $newPiece = $('<li/>');
        var $textArea = $('<textarea>').addClass('form-control').attr('row', 3).css('max-width',300);
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
    });
}());