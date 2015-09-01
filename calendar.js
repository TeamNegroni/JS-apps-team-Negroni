(function (todaysDate) {
        $calendar = $('#calendar');

    buildCalendar(todaysDate,$calendar);

    function buildCalendar(todaysDate,$wrapper) {
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
            headTemplate = buildHeadTemplate();
        var $currentDateLink = $('<button/>');

        // setting up controls part
        // TODO: moving between months when pressing arrows
        $controls.addClass('controls');
        $button.addClass('btn');
        $button.addClass('btn-default');
        $currentMonthAndYear.addClass('current-month-and-year');
        updateMonthAndYearLabel();
        $controls.append($button.clone().html('Hide Calendar').addClass('btn-block').attr('id','calendar-toggleButton'));
        $controls.append($button.clone().html('<'));
        $controls.append($currentMonthAndYear);
        $controls.append($button.clone().html('>'));
        $controls.on('click', 'button', function () {
            var $this = $(this);
            if($this.attr('id') === 'calendar-toggleButton') {
                $calendar.animate({
                    opacity: 0
                },500);
            } else {
            var goingOnMonth,
                goingOnYear;

            if ($(this).html() === '&lt;') {
                if(date.getMonth() === 0) {
                    goingOnMonth = 11;
                    goingOnYear = date.getFullYear() - 1;
                } else {
                    goingOnMonth = date.getMonth() - 1;
                    goingOnYear = date.getFullYear();
                }
            } else {
                if(date.getMonth() === 11) {
                    goingOnMonth = 0;
                    goingOnYear = date.getFullYear() + 1;
                } else {
                    goingOnMonth = date.getMonth() + 1;
                    goingOnYear = date.getFullYear();
                }
            }
            date = new Date(goingOnYear,goingOnMonth,1);
            //$daysTable.hide(300); ANIMATION TO BE ADDED
            updateTable(date);
            //animateTable();
            updateMonthAndYearLabel();
            }
        });

function animateTable() {
    var children = $daysTable.children(),
    len = children.length,
    i;
    for(i = 0; i<len; i+=1) {
        var childs = children[i].children();
        while(childs) {

        }
    }
    /* .forEach(function(child) {
        setTimeout(function() {
            $(child).show();
        },100)
        console.log(child);
    });
*/
}

        $controls.on('mouseover','button',function() {
            var $this = $(this);
            $this.animate({
                backgroundColor: '#2780e3'
            },300);
        });

                $controls.on('mouseout','button',function() {
            var $this = $(this);
            $this.animate({
                backgroundColor: '#ffffff'
            },300)
        });

        // setting up the table with days
        // TODO: when a day is pressed must ask the server for data on that day
        $daysTable.addClass('daysTable');
        updateTable(date);
        $daysTable.on('click', 'td', function (e) {
            var $clickedDay = $(e.target),
                clickedDay = +$clickedDay.html(),
                goToMonth;
            if ($clickedDay.hasClass('current-month')) {
                date = new Date(date.getFullYear(), date.getMonth(), clickedDay);
                console.log(date);
                // !!! Add connection to the server about the date info, use date variable,
                // !!! hide the div with the calendar, here the calendar disappears and the module is called again on another 'View Calendar' button press.
            } else {
                // TODO: Transition between months must be added
                if(clickedDay >= 15) {
                    goToMonth = date.getMonth() - 1;
                } else {
                    goToMonth = date.getMonth() + 1;
                }
                date = new Date(date.getFullYear(),goToMonth,1);
                updateTable(date);
                updateMonthAndYearLabel();
            }

        });

        // setting up the lowest(current day) part
        $currentDateLink
        .addClass('btn')
        .addClass('btn-block')
        .addClass('btn-default')
            .addClass('current-date-link')
            .addClass('current-date');
        $currentDateLink.html('Today');
        $currentDateLink.on('click', function () {
            console.log(todaysDate);
            // !!! Add connection to the server about the todaysDate info, use todaysDate variable,
            // !!! hide the div with the calendar, here the calendar disappears and the module is called again on another 'View Calendar' button press.
        });


        // blending it all together
        $wrapper.append($controls);
        $wrapper.append($daysTable);
        $wrapper.append($currentDateLink);

        function updateMonthAndYearLabel() {
            $currentMonthAndYear.html(date.getMonthName() + ' ' + date.getFullYear());
        }

        function updateTable(date) {
            var daysTemplate = updateDays(date, 'current-day', 'current-month', 'another-month'); // might need to be outside this scope for update purposes
            $daysTable.html(headTemplate + daysTemplate);
        }

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

        function updateDays(currentDate, currentDayCssClass, currentMonthCssClass, anotherMonthCssClass) {
            var currentMonthDays = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear()),
                daysTableTemplate = '',
                inRow = false;
            var currentMonth = currentDate.getMonth(),
                previousMonthDays,
                nextMonthDays;

            // might refactor to get only the count of the days in month
            if (currentMonth === 0) {
                previousMonthDays = getDaysInMonth(11, currentDate.getFullYear() - 1);
                nextMonthDays = getDaysInMonth(1, currentDate.getFullYear());
            } else if (currentMonth === 11) {
                previousMonthDays = getDaysInMonth(10, currentDate.getFullYear());
                nextMonthDays = getDaysInMonth(0, currentDate.getFullYear() + 1);
            } else {
                previousMonthDays = getDaysInMonth(currentMonth - 1, currentDate.getFullYear() - 1);
                nextMonthDays = getDaysInMonth(currentMonth + 1, currentDate.getFullYear());
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
                    if (todaysDate.getDate() === day && todaysDate.getMonth() === currentMonth && date.getFullYear() === todaysDate.getFullYear()) {
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