// Store DOM elements
// Form
var formDiv = document.getElementById("formDiv");
var gramsInput = document.getElementById("gramsOfCoffeeInput");
var helperText = document.getElementById("helperText")
var button = document.getElementById("startBrewingButton");

// Display
var displayDiv = document.getElementById("displayDiv");
var progress = document.getElementById("progressBar");
var message = document.getElementById("timerMessage");
var gramsDisplay = document.getElementById("pourGramsOfWater");
var timerDisplay = document.getElementById("timerDisplay");

button.addEventListener("click", function(e) {
    e.preventDefault();

    // Check for errors
    if (!Number(gramsInput.value)) {
        helperText.textContent = "Please enter a number";
        deleteFocus(gramsInput);
        return false;
    } else if (Number(gramsInput.value) <= 5) {
        helperText.textContent = "Brew with at least 6 grams";
        deleteFocus(gramsInput);
        return false;
    }
    // Setup for timer
    helperText.textContent = "";
    var totalWater = Number(gramsInput.value) * 16.66;
    var bloom = Number(gramsInput.value) * 2;
    var pour = totalWater - bloom;
    // Grams of water to pour every second
    var increment = pour / 150;
    // Clear and toggle the display
    gramsInput.value = "";
    // Progress is mapped using 180 seconds, bloom fixes to 30 seconds
    gramsDisplay.textContent = Math.round(bloom);
    progressBar.value = 30;
    toggleDisplays();
    // This will count seconds
    var counter = 0;
    // Start timer
    // Display stays at bloom value for half a minute
    // When pour begins, the timer increments progress bar and displayed g's of water
    // At 180 seconds, the timer stops and resets
    var interval = setInterval(function() {
        counter++;

        // Start brewing at 30 seconds
        if (counter > 30) {
            if (timerMessage.textContent != "Brew") {
                timerMessage.textContent = "Brew";
            }

            // Set display divs to show updated values every second
            gramsDisplay.textContent = bloom + Math.round((counter - 30) * increment);
            progressBar.value++;
        }
        timerDisplay.textContent = secondsToMmSsString(counter);
        if (counter === 180) {
            clearInterval(interval);
            timerMessage.textContent = "Enjoy! Resetting..."
            // Wait for three seconds and toggle
            setTimeout(function() {
                timerMessage.textContent = "Bloom";
                toggleDisplays();
            }, 3000);
        }
    }, 300);

});

// formats seconds
// 5 --> 00:05 used for timer on screen
function secondsToMmSsString(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds % 60;
    return "0" + minutes + ":" + (seconds >= 10 ? seconds : "0" + seconds);
}

function deleteFocus(element) {
    element.value = "";
    element.focus();
}

// Hide one, show other
function toggleDisplays() {
    formDiv.classList.toggle("hide");
    timerDiv.classList.toggle("hide");
}