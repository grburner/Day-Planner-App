var currentTime = moment().format('LT')
var currentDate = moment().format('YYYY-MM-DD')
//variable passed into the .subtract method to decrement by an hour
var time = moment.duration("01:00", 'HH');
//test variable to test outside of 9-5 hours
var testMoment = moment('10:10', 'HH:mm')

//runs setTaskValues to reset the displayed taks
// -> loops through each time slot to determine if the time slot is before, during, or after the current time, then sets formatting
// ---> TO DO: wrap in a setTimeout function to run the loop every minute to dynamically update the formatting
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

//for each k/v pair in localstorage save the key and value to a variable then pass each into the compareStorage() function to determine which time slot to add them to
function setTaskValues() {
    // $.each(localStorage, function(key, value) {
    // }); ******* use each to get this done *********
    for ( var i = 0; i < localStorage.length; i++ ) {
        var displayValue = localStorage.getItem(localStorage.key(i))
        var displayKey = localStorage.key(i)
        compareStorage(displayKey, displayValue)
    };
};

//compares local storage key to the data-time-slot of each time slot 
// -> if they match then the value is added to the input field
function compareStorage(displayKey, displayValue) {
    $(".time-slot").each(function() {
        if ( $(this).data("timeSlot") === displayKey) {
            $(this).children(".input-field").val(displayValue)
        };
    }
)};

//pulls the input and data-time-slot from the click event and saves them as a key/value pair in local storage
function saveUserInput() {
    var savedInput = $(this).siblings(".input-field").val()
    var savedTimeSlot = $(this).parent().data("timeSlot")
    localStorage.setItem(savedTimeSlot, savedInput)
    setTaskValues()
};

//click event for the .save-btn class
// -> callback function saveUserInput to save the k/v pair to local storage
$(document).on("click", ".save-btn", saveUserInput)
