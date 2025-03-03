var inv__entry = document.querySelector(".inv__entry")
var steps__entry = document.querySelector(".steps__entry")
var percentage__entry = document.querySelector(".percentage__entry")
var result = document.querySelector(".result__vals")
var totalElement = document.querySelector(".total")
var profitElement = document.querySelector(".profit")

const password = "123"; // Replace with your desired password
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const passwordInput = document.getElementById("passwordInput");
const unlockButton = document.getElementById("unlockButton");
const incorrectPasswordMessage = document.getElementById("incorrectPasswordMessage");

// Function to unlock the screen
function unlockScreen() {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === password) {
        lockScreen.style.display = "none";
        mainContent.style.display = "block";
        incorrectPasswordMessage.style.display = "none"; // Hide error message
    } else {
        incorrectPasswordMessage.style.display = "block"; // Show error message
    }
}

// Add event listener to the unlock button
unlockButton.addEventListener("click", unlockScreen);

// Add event listener to the password input for "Enter" key press
passwordInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        unlockScreen();
    }
});

// Function to calculate and display the results
var MAIN__FUNCTION = _ => {
    var inv = Number(inv__entry.value)
    var steps = Number(steps__entry.value)
    var percentage = Number(percentage__entry.value) / 100

    result.innerHTML = ""

    var vals = []

    for (let i = 0; i < steps; i++) {
        var formula = inv * (1 + (1 / percentage)) ** i;
        vals.push(Math.round(formula))
    }

    // Calculate total investment and profit
    const totalInvestment = vals.reduce((a, b) => a + b, 0);
    const profitPerSession = inv * percentage;

    // Update the HTML with the calculated values
    totalElement.innerHTML = "INVESTMENT: $" + totalInvestment.toFixed(2);
    profitElement.innerHTML = "≈ PROFIT/SESSION: $" + profitPerSession.toFixed(2);

    vals.forEach(j => {
        const span = document.createElement("span");
        span.textContent = j;
        result.appendChild(span);
    });
}

// Initial call to MAIN__FUNCTION
MAIN__FUNCTION()

// Add event listeners to input fields to trigger the calculation
inv__entry.onchange = _ => MAIN__FUNCTION()
steps__entry.onchange = _ => MAIN__FUNCTION()
percentage__entry.onchange = _ => MAIN__FUNCTION()
