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
        tolerance: 'pointer'
    });



    $adder.on('click', function () {
        var $newPiece = $('<li/>');
        $newPiece.addClass('gridPiece');

        $newPiece.text(index);
        index += 1;

        $newPiece.resizable({
            grid: [200,200], // value to be edited
            autoHide: true,
            animate: true,
            animateEasing: "easeInOutQuint"
        });

        $newPiece.insertBefore('#gridAdder');
    });
}());