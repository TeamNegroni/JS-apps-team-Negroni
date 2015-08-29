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

        var $controls = $('<div/>'),
            $button = $('<button/>'),
            $currentMonthAndYear = $('<div/>');
        var $daysTable = $('<table/>'),
            headTemplate,
            daysTemplate;
        var $currentDateLink = $('<button/>');

        // setting up controls part
        // TODO: moving between months when pressing arrows
        $controls.addClass('controls');
        $button.addClass('btn');
        $currentMonthAndYear.addClass('current-month-and-year');
        $currentMonthAndYear.html(date.getMonthName() + ' ' + date.getFullYear());
        $controls.append($button.clone().text('<'));
        $controls.append($currentMonthAndYear);
        $controls.append($button.clone().text('>'));

        // setting up the table with days
        // TODO: when a day is pressed must ask the server for data on that day
        $daysTable.addClass('daysTable');
        headTemplate = buildHeadTemplate();
        daysTemplate = refreshDays(date, 'current-day', 'current-month', 'another-month'); // might need to be outside this scope for update purposes
        $daysTable.html(headTemplate + daysTemplate);
        $daysTable.on('click', 'td', function (e) {
            var $clickedDay = $(e.target);
            if ($clickedDay.hasClass('current-month')) {
                date = new Date(date.getFullYear(), date.getMonth(), +$clickedDay.html());
                console.log(date);
                // !!! Add connection to the server about the date info, use date variable,
                // !!! hide the div with the calendar, here the calendar disappears and the module is called again on another 'View Calendar' button press.
            } else {
                // TODO: Transition between months must be added
                $currentMonthAndYear.html(date.getMonthName() + ' ' + date.getFullYear());
                console.log('Ne');
            }

        });

        // setting up the lowest(current day) part
        $currentDateLink
            .addClass('current-date-link')
            .addClass('current-date');
        $currentDateLink.html('Today');
        $currentDateLink.on('click', function () {
            console.log(todaysDate);
            // !!! Add connection to the server about the date info, use date variable,
            // !!! hide the div with the calendar, here the calendar disappears and the module is called again on another 'View Calendar' button press.
        });


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

        function refreshDays(currentDay, currentDayCssClass, currentMonthCssClass, anotherMonthCssClass) {
            var currentMonthDays = getDaysInMonth(currentDay.getMonth(), currentDay.getFullYear()),
                daysTableTemplate = '',
                inRow = false;
            var currentMonth = date.getMonth(),
                previousMonthDays,
                nextMonthDays;

            // might refactor to get only the count of the days in month
            if (currentMonth === 0) {
                previousMonthDays = getDaysInMonth(11, date.getFullYear() - 1);
                nextMonthDays = getDaysInMonth(1, date.getFullYear());
            } else if (currentMonth === 11) {
                previousMonthDays = getDaysInMonth(10, date.getFullYear());
                nextMonthDays = getDaysInMonth(0, date.getFullYear() + 1);
            } else {
                previousMonthDays = getDaysInMonth(currentMonth - 1, date.getFullYear() - 1);
                nextMonthDays = getDaysInMonth(currentMonth + 1, date.getFullYear());
            }

            var currentMonthDaysIndex = 0,
                nextMonthDaysIndex = 0;
            for (var i = 0; i < 42; i++) {
                var day,
                    inCurrentMonth,
                    cssClass;

                if ((currentMonthDaysIndex !== 0 && currentMonthDaysIndex < currentMonthDays.length) ||
                    currentMonthDays[0].getDay() === i) {
                    inCurrentMonth = true;
                    day = currentMonthDays[currentMonthDaysIndex].getDate();
                    currentMonthDaysIndex += 1;
                } else if (currentMonthDaysIndex === 0) {
                    inCurrentMonth = false;
                    day = previousMonthDays[previousMonthDays.length - (currentMonthDays[0].getDay() + 1) + (i + 1)].getDate();
                } else {
                    inCurrentMonth = false;
                    day = nextMonthDays[nextMonthDaysIndex].getDate();
                    nextMonthDaysIndex += 1;
                }

                if (i % 7 === 0) {
                    if (!inRow) {
                        daysTableTemplate += '<tr>';
                        inRow = true;
                    } else {
                        daysTableTemplate += '</tr>';
                        inRow = false;
                    }
                }

                if (inCurrentMonth) {
                    if (date.getDate() === day) {
                        cssClass = currentMonthCssClass + ' ' + currentDayCssClass;
                    } else {
                        cssClass = currentMonthCssClass;
                    }
                } else {
                    cssClass = anotherMonthCssClass;
                }

                daysTableTemplate += '<td class="' + cssClass + '">' + day + '</td>';
            }

            return daysTableTemplate;
        }
    }
}());