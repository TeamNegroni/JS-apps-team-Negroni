(function () {
    var $todoList = $('#todo-list'),
        $todoWrapper = $('#todo'),
        $field = $('#newitem');
    var sPositions,
        positions;

    $todoWrapper.draggable({
        scroll: true,
        containment: "parent",
        stop: function (event, ui) {
            positions[this.id] = ui.position;
            localStorage.positions = JSON.stringify(positions)
        }
    });

    $todoWrapper.resizable({});

    $todoWrapper.on('click', 'input[type="submit"]', function () {
        var todoHtml = $todoList.html();
        todoHtml += '<li>' + $field.val() + '</li>';
        $todoList.html(todoHtml);
        $field.val('');
        $field.focus();
        saveTodoInLocalStorage();
    });

    $todoList.on('click', 'li', function (ev) {
        var target = ev.target;
        if (target.tagName === 'LI') {
            if (target.classList.contains('done')) {
                target.parentNode.removeChild(target);
            } else {
                target.classList.add('done');
            }
            saveTodoInLocalStorage();
        }
    });

    $(document).ready(retrieveState);

    function saveTodoInLocalStorage() {
        localStorage.todolist = $todoList.html();
    }

    function retrieveState() {
        if (localStorage.todolist) {
            $todoList.html(localStorage.todolist);
        }

        $todoWrapper.css('display', 'inline-block');
        $todoWrapper.show();

        //retrieving positions
        sPositions = localStorage.positions || "{}";
        positions = JSON.parse(sPositions);
        $.each(positions, function (id, pos) {
            $("#" + id).css(pos)
        });
    }
})();