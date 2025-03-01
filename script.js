document.addEventListener("DOMContentLoaded", () => {
    // Password Authentication
    const passwordPopup = document.querySelector(".password-popup");
    const passwordInput = document.querySelector("#password-input");
    const unlockBtn = document.querySelector("#unlock-btn");
    const errorMsg = document.querySelector("#error-msg");
    const mainContainer = document.querySelector(".main-container");

    const PASSWORD = "1234";  // Change this to set your own password

    unlockBtn.addEventListener("click", () => {
        if (passwordInput.value === PASSWORD) {
            passwordPopup.classList.add("hidden");
            mainContainer.classList.add("visible");
        } else {
            errorMsg.textContent = "Incorrect password. Try again.";
        }
    });

    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") unlockBtn.click();
    });

    // Step Calculation
    const invInput = document.querySelector("#initial-investment");
    const stepInput = document.querySelector("#step-count");
    const percentageInput = document.querySelector("#percentage");
    const stepSuggestions = document.querySelector("#step-suggestions");
    const resultSteps = document.querySelector("#result-steps");
    const totalInvestment = document.querySelector("#total-investment");
    const estimatedProfit = document.querySelector("#estimated-profit");
    const calculateBtn = document.querySelector("#calculate-btn");
    const resetBtn = document.querySelector("#reset-btn");

    const generateSteps = () => {
        let inv = Number(invInput.value);
        let steps = Number(stepInput.value);
        let percentage = Number(percentageInput.value) / 100;

        if (steps > 100) {
            stepInput.value = 100;
            steps = 100;
        }

        resultSteps.innerHTML = "";
        let values = [];

        for (let i = 0; i < steps; i++) {
            let amount = inv * (1 + (1 / percentage)) ** i;
            values.push(Math.round(amount));
        }

        totalInvestment.innerHTML = ` Total Investment: <strong>$${values.reduce((a, b) => a + b, 0)}</strong>`;
        estimatedProfit.innerHTML = ` Estimated Profit: <strong>$${(inv * percentage).toFixed(2)}</strong>`;

        values.forEach(value => {
            let stepBubble = document.createElement("span");
            stepBubble.classList.add("step-bubble");
            stepBubble.textContent = value;
            resultSteps.appendChild(stepBubble);
        });
    };

    stepSuggestions.addEventListener("change", () => {
        stepInput.value = stepSuggestions.value;
    });

    calculateBtn.addEventListener("click", generateSteps);
    resetBtn.addEventListener("click", () => {
        invInput.value = "1";
        stepInput.value = "5";
        percentageInput.value = "85";
        resultSteps.innerHTML = "";
        totalInvestment.innerHTML = "";
        estimatedProfit.innerHTML = "";
    });

    generateSteps();
});