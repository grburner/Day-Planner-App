//var currentTime = moment().format('LT')
var currentDate = moment().format('YYYY-MM-DD')
//variable passed into the .subtract method to decrement by an hour
var time = moment.duration("01:00", 'HH');
//test variable to test outside of 9-5 hours
var testMoment = moment('10:59', 'HH:mm')

// ---> TO DO: add the current date in the header
// ---> TO DO: clean up formatting 
//      -> add in disk button for the save button and format to blue

// ---> EXTRAS TO DO:
//      -> break up the task row into blocks depending on how many tasks are in that time slot
//      -> make functionality to mark a task complete and move it to a completed tasks list
//      -> set up the header like my current homepage

//runs setTaskValues to reset the displayed taks
// -> loops through each time slot to determine if the time slot is before, during, or after the current time, then sets formatting
// ---> TO DO: wrap in a setTimeout function to run the loop every minute to dynamically update the formatting

$(document).ready(function() {
//     setInterval(setTimeblockFormatting, 1000)
});
setTimeblockFormatting()
//
function setTimeblockFormatting() {
    setTaskValues()
    $("#timeSlotContainer").children().each(function() {
        var thisData = $(this).data("timeSlot")
        var thisMoment = moment(thisData, 'HH:mm')
        var subtractMoment = thisMoment.clone().subtract(time)
        console.log(Boolean(moment().isAfter(currentDate + ' ' + thisData)))
        console.log(Boolean(moment().isBefore(currentDate + ' ' + subtractMoment)))
        if ( moment().isBefore(currentDate + ' ' + thisData) ) {
            $(this).children(".input-field").addClass("future")
        //} else if ( moment().isBetween(currentDate + ' ' + thisData, currentDate + ' ' + subtractMoment)) {
        } else if ( moment().isAfter(currentDate + ' ' + thisData) && moment().isBefore(currentDate + ' ' + subtractMoment) ) {
            $(this).children(".input-field").addClass("present")
        } else {
            $(this).children(".input-field").addClass("past")
            // add in future block
        };
    }); 
};

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
