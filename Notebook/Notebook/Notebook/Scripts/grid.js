(function () {
    var $grid = $('#grid'),
        $adder = $('#gridAdder');
    var index = 1;

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


    $adder.on('click', function () {
        var $newPiece = $('<li/>');
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

        $newPiece.hide();
        $newPiece.insertBefore('#gridAdder');
        $newPiece.show(500);
    });
}());