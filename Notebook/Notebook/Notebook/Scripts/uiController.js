var currentDate = new Date();
$("#date-controller").attr('placeholder', currentDate.getDate()
    + currentDate.getMonth() + " " + currentDate.getFullYear());