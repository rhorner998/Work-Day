
$(document).ready(function () {
  $(function () {
    // Display the current date in the header
    var currentDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDate);

    // Click event listener for the Save buttons
    $(".saveBtn").on("click", function () {
        var timeBlock = $(this).closest(".time-block");
        var hourId = timeBlock.attr("id");
        var description = timeBlock.find(".description").val();
        localStorage.setItem(hourId, description);
    });

    // Function to update the time-block classes based on the current hour
    function updateTimeBlocks() {
        var currentHour = dayjs().format("H");
        $(".time-block").each(function () {
            var hourId = $(this).attr("id");
            var blockHour = parseInt(hourId.split("-")[1]);

            if (blockHour < currentHour) {
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour == currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    // Get and display user input from local storage
    function displayStoredTasks() {
        $(".time-block").each(function () {
            var hourId = $(this).attr("id");
            var savedDescription = localStorage.getItem(hourId);
            if (savedDescription !== null) {
                $(this).find(".description").val(savedDescription);
            }
        });
    }

    // Call the functions to update time-block classes and display stored tasks
    updateTimeBlocks();
    displayStoredTasks();
});
});

