// Store DOM elements
// Navbar
var burger = document.querySelector(".navbar-burger");
var menu = document.querySelector(".navbar-menu");

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

// Burger menu expands the hidden navbar items
burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
});

// App runs when button is clicked
button.addEventListener("click", function(e) {
    e.preventDefault();

    // Check for errors
    if (!Number(gramsInput.value)) {
        helperText.textContent = "Please enter a number";
        deleteFocus(gramsInput);
        return false;
    } else if (Number(gramsInput.value) > 80) {
        helperText.textContent = "Please use less than 80 grams";
        deleteFocus(gramsInput);
        return false;
    } else if (Number(gramsInput.value) <= 5) {
        helperText.textContent = "Please use more than 5 grams";
        deleteFocus(gramsInput);
        return false;
    }

    // Setup for timer
    // Clear error message, calculate total water
    helperText.textContent = "";
    var totalWater = Number(gramsInput.value) * 16.66;

    // The bloom is the initial pour
    var bloom = Number(gramsInput.value) * 2;
    // The pour is the rest of the water
    var pour = totalWater - bloom;

    // Grams of water to pour every second
    // 150 is used instead of 180, because the actual pour is 150 seconds long
    var increment = pour / 150;
    // Clear and toggle the display
    gramsInput.value = "";

    // Progress bar is mapped using the 180 seconds model
    gramsDisplay.textContent = Math.round(bloom);
    progress.value = 30;
    progress.classList.remove("is-success");

    // Change from form display to timer display
    toggleDisplays();

    // This will count seconds
    var counter = 0;

    // Start timer
    // Display stays at bloom value for half a minute
    // When pour begins, the timer increments progress bar and displayed grams of water
    // At 180 seconds, the timer stops and resets
    var interval = setInterval(function() {
        counter++;

        // Start brewing at 30 seconds
        if (counter > 30) {
            if (timerMessage.textContent != "Brew") {
                timerMessage.textContent = "Brew";
                progress.classList.add("is-link");
            }

            // Set display divs to show updated values every second
            gramsDisplay.textContent = bloom + Math.round((counter - 30) * increment);
            progress.value++;
        }
        timerDisplay.textContent = secondsToMmSsString(counter);
        if (counter === 180) {
            // Stop timer and show resetting state
            clearInterval(interval);
            progress.classList.remove("is-link");
            progress.classList.add("is-success");
            timerMessage.textContent = "Enjoy! Resetting..."
            // Wait for three seconds and toggle
            setTimeout(function() {
                timerMessage.textContent = "Bloom";
                toggleDisplays();
            }, 3000);
        }
    }, 1000);

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