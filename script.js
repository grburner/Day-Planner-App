var currentTime = moment().format('LT')
var currentDate = moment().format('YYYY-MM-DD')
var time = moment.duration("01:00", 'HH');
testMoment = moment('10:10', 'HH:mm')

// divs are generated run a setTimeout loop that constantly checks the time and updates the grid color
$(document).ready(function() {
    setTaskValues()
    $("#timeSlotContainer").children().each(function() {
        var thisData = $(this).data("timeSlot")
        var thisMoment = moment(thisData, 'HH:mm')
        console.log(thisMoment._d)
        //returns moment object
        var subtractMoment = thisMoment.clone().subtract(time)
        console.log(subtractMoment._d)
        //returns moment object with _d subtracted
        if ( testMoment.isBefore(currentDate + ' ' + thisData) ) {
            $(this).addClass("future")
        } else if ( testMoment.isBetween(currentDate + ' ' + thisData, currentDate + ' ' + subtractMoment)) {
            $(this).addClass("present")
        } else {
            $(this).addClass("past")
            // add in future block
        };
    });  
});

function setTaskValues() {
    // $.each(localStorage, function(key, value) {
    // }); ******* use each to get this done *********
    for ( var i = 0; i < localStorage.length; i++ ) {
        var displayValue = localStorage.getItem(localStorage.key(i))
        var displayKey = localStorage.key(i)
        compareStorage(displayKey, displayValue)
    };
};

function compareStorage(displayKey, displayValue) {
    $(".time-slot").each(function() {
        if ( $(this).data("timeSlot") === displayKey) {
            $(this).children(".input-field").val(displayValue)
        };
    }
)};

function saveUserInput() {
    var savedInput = $(this).siblings(".input-field").val()
    var savedTimeSlot = $(this).parent().data("timeSlot")
    localStorage.setItem(savedTimeSlot, savedInput)
    setTaskValues()
};

$(document).on("click", ".save-btn", saveUserInput)
