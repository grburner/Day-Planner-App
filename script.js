
// ---> TO DO: clean up formatting 
//      -> center disk
// ---> TO DO: fix text box focus bug
// ---> TO DO: check that text box formatting updates on the hour

// ---> EXTRAS TO DO:
//      -> break up the task row into blocks depending on how many tasks are in that time slot
//      -> make functionality to mark a task complete and move it to a completed tasks list
//      -> set up the header like my current homepage

// set the date/time & time block formatting on document.ready
$(document).ready(function() {
    setTimeblockFormatting()
    setCurrentTime()
});

// updates time block formatting at minute 0 of every hour
setInterval(function() {
    if ( moment().minute() === 0 ) {
        setTimeblockFormatting()
    };
}, 60000)

// updates clock and date function every second
setInterval(setCurrentTime, 1000)

// gets the current moment for day and time
function setCurrentTime() {
    $("#currentDay").text(moment().format('LL'))
    $("#currentTime").text(moment().format('LTS'))
};

// updates the time block formatting by comparing time block's data attribute and comparing it to past, present, or future and setting the class for that formatting
function setTimeblockFormatting() {
    setTaskValues()
    $("#timeSlotContainer").children().each(function() {
        var thisData = parseInt($(this).data('timeSlot').split(":")[0]);
        var thisMoment = moment().hours()
        if ( thisData < thisMoment ) {
            $(this).children(".input-field").addClass("past")
        } else if ( thisData === thisMoment ) {
            $(this).children(".input-field").addClass("present")
        } else {
            $(this).children(".input-field").addClass("future")
        }
    });
};

//for each k/v pair in localstorage save the key and value to a variable then pass each into the compareStorage() function to determine which time slot to add them to
function setTaskValues() {
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
        if ( $(this).data("timeSlot") === displayKey ) {
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
$(document).on("click", ".saveBtn", saveUserInput)




/* future: get the moment methods working:

        // var thisData = $(this).data("timeSlot")
        // var thisMoment = moment(thisData, 'HH:mm')
        // var subtractMoment = thisMoment.clone().subtract(time)
        // console.log(Boolean(moment().isAfter(currentDate + ' ' + thisData)))
        // console.log(Boolean(moment().isBefore(currentDate + ' ' + subtractMoment)))
        // if ( moment().isBefore(currentDate + ' ' + thisData) ) {
        //     $(this).children(".input-field").addClass("future")
        // //} else if ( moment().isBetween(currentDate + ' ' + thisData, currentDate + ' ' + subtractMoment)) {
        // } else if ( moment().isAfter(currentDate + ' ' + thisData) && moment().isBefore(currentDate + ' ' + subtractMoment) ) {
        //     $(this).children(".input-field").addClass("present")
        // } else {
        //     $(this).children(".input-field").addClass("past")
        //     // add in future block
        // };

*/