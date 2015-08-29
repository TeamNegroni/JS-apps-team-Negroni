(function (todaysDate) {
    var $toggleButton = $('#calendar-toggleButton'),
        $calendar = $('#calendar');

    buildCalendar(todaysDate);
    $calendar.hide();

    var toggleButtonContent = 'View Calendar';
    $toggleButton.html(toggleButtonContent);

    $toggleButton.on('click', function () {
        if (toggleButtonContent === 'View Calendar') {
            toggleButtonContent = 'Back';
        } else {
            toggleButtonContent = 'View Calendar';
        }
        $toggleButton.html(toggleButtonContent);

        $calendar.toggle(100);
    });

    function buildCalendar(todaysDate) {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        todaysDate = todaysDate || new Date();
        var date = new Date(todaysDate);    // you are welcome :)
        console.log(date.getDayName());
        console.log(date.getMonthName());

        var $controls = $('<div/>'),
            $button = $('<button/>'),
            $currentMonth = $('<div/>');
        var $daysTable = $('<table/>'),
            headTemplate,
            daysTemplate;
        var $currentDateLink = $('<div/>');

        // setting up controls part
            // TODO: moving between months when pressing arrows
        $controls.addClass('controls');
        $button.addClass('btn');
        $currentMonth.addClass('current-month');
        $controls.append($button.clone().text('<'));
        $controls.append($currentMonth);
        $controls.append($button.clone().text('>'));

        // setting up the table with days
            // TODO: when a day is pressed must ask the server for data on that day
        $daysTable.addClass('.daysTable');
        headTemplate = buildHeadTemplate();
        daysTemplate = refreshDays(); // might need to be outside this scope for update purposes
        $daysTable.html(headTemplate + daysTemplate);

        // setting up the lowest(current day) part
            // TODO: add onclick to focus the today's date in the table
        $currentDateLink
            .addClass('current-date-link')
            .addClass('current-date');
        $currentDateLink.text(date.getDayName() + ' ' + date.getMonthName() + ' ' + date.getFullYear());


        // blending it all together
        $calendar.append($controls);
        $calendar.append($daysTable);
        $calendar.append($currentDateLink);

        function buildHeadTemplate() {
            var headTemplate = '<thead>';
            for (var i = 0; i < WEEK_DAY_NAMES.length; i++) {
                var currentDay = WEEK_DAY_NAMES[i];
                headTemplate += '<th>' + currentDay + '</th>';
            }
            headTemplate += '</thead>';
            return headTemplate;
        }

        function getDaysInMonth(month, year) {
            var date = new Date(year, month, 1);
            var days = [];
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        }

        function refreshDays() {
            var days = getDaysInMonth(date.getMonth(), date.getFullYear());
            var daysTableTemplate = '',
                inRow = false;
            for (var i = 0; i < days.length; i++) {
                var day = days[i].getDate();
                if (i % 7 === 0) {
                    if (!inRow) {
                        daysTableTemplate += '<tr>';
                        inRow = true;
                    } else {
                        daysTableTemplate += '</tr>';
                        inRow = false;
                    }
                }

                daysTableTemplate += '<td>' + day + '</td>';
            }

            return daysTableTemplate;
        }
    }
}());