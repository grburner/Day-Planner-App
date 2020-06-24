var currentTime = moment().format('LT')
var currentDate = moment().format('YYYY-MM-DD')

//on load generate new divs
    // pull saved info from local storage

// divs are generated run a setTimeout loop that constantly checks the time and updates the grid color
$(document).ready(function() {
    setTaskValues()
    $("#timeSlotContainer").children().each(function() {
            if ( moment().isBefore(currentDate + ' ' + $(this).data("timeSlot")) ) {
                console.log('isbefore ' + $(this).data("timeSlot"))
                $(this).addClass("future")
            } else {
                console.log('isafter ' + $(this).data("timeSlot"))
                $(this).addClass("past")
            };
        });  
    });

function setTaskValues() {
    console.log('into setTaskValues')
    // $.each(localStorage, function(key, value) {
    // }); ******* use each to get this done *********
    for ( var i = 0; i < localStorage.length; i++ ) {
        var displayValue = localStorage.getItem(localStorage.key(i))
        var displayKey = localStorage.key(i)
        compareStorage(displayKey, displayValue)
    };
};

function compareStorage(key, eventVal) {
    $(".time-slot").each(function() {
        console.log('timeslot ' + $(this).data("timeSlot") + ' key: ' + key)
        if ( $(this).data("timeSlot") === key) {
            $(this).children(".input-field").val(eventVal)
        };
    }
)};

function saveUserInput() {
    var savedInput = $(this).siblings(".input-field").val()
    var savedTimeSlot = $(this).parent().data("timeSlot")
    localStorage.setItem(savedTimeSlot, savedInput)
    setTaskValues()
};
// build input function to take user input and save it to localStorage
$(document).on("click", ".save-btn", saveUserInput)
    // build save button functionality