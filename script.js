document.addEventListener("DOMContentLoaded", () => {
    const passwordPopup = document.querySelector(".password-popup");
    const passwordInput = document.querySelector("#password-input");
    const submitPassword = document.querySelector("#submit-password");
    const errorMessage = document.querySelector("#error-message");
    const outerWrapper = document.querySelector(".outer__wrapper");

    const correctPassword = "1234";  // Set your password here

    submitPassword.addEventListener("click", () => {
        if (passwordInput.value === correctPassword) {
            passwordPopup.classList.add("hide");
            outerWrapper.classList.add("show");
        } else {
            errorMessage.textContent = "Incorrect password! Try again.";
        }
    });

    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            submitPassword.click();
        }
    });

    const invEntry = document.querySelector(".inv__entry");
    const stepsEntry = document.querySelector(".steps__entry");
    const percentageEntry = document.querySelector(".percentage__entry");
    const stepSuggestions = document.querySelector(".step__suggestions");
    const resultVals = document.querySelector(".result__vals");
    const totalInvestment = document.querySelector(".total");
    const profitPerSession = document.querySelector(".profit");
    const generateStepsBtn = document.querySelector("#generate-steps");
    const resetBtn = document.querySelector("#reset-values");

    const calculateInvestment = () => {
        let inv = Number(invEntry.value);
        let steps = Number(stepsEntry.value);
        let percentage = Number(percentageEntry.value) / 100;

        if (steps > 100) {
            stepsEntry.value = 100;
            steps = 100;
        }

        resultVals.innerHTML = "";
        let values = [];

        for (let i = 0; i < steps; i++) {
            let formula = inv * (1 + (1 / percentage)) ** i;
            values.push(Math.round(formula));
        }

        totalInvestment.innerHTML = `💰 Total Investment: <strong>$${values.reduce((a, b) => a + b, 0)}</strong>`;
        profitPerSession.innerHTML = `📈 Approx. Profit/Session: <strong>$${(inv * percentage).toFixed(2)}</strong>`;

        values.forEach(val => {
            let span = document.createElement("span");
            span.classList.add("step-bubble");
            span.textContent = val;
            resultVals.appendChild(span);
        });
    };

    generateStepsBtn.addEventListener("click", calculateInvestment);
    resetBtn.addEventListener("click", () => {
        invEntry.value = "1";
        stepsEntry.value = "5";
        percentageEntry.value = "85";
        resultVals.innerHTML = "";
        totalInvestment.innerHTML = "";
        profitPerSession.innerHTML = "";
    });

    stepSuggestions.addEventListener("change", () => {
        stepsEntry.value = stepSuggestions.value;
    });

    calculateInvestment();
});