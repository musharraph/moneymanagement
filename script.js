document.addEventListener("DOMContentLoaded", () => {
    // Lock Screen Elements
    const passwordPopup = document.querySelector(".password-modal");
    const passwordInput = document.querySelector("#password");
    const unlockBtn = document.querySelector("#unlock");
    const errorMsg = document.querySelector("#password-error");
    const mainContainer = document.querySelector(".main-container");
    
    const PASSWORD = "1234"; // Set your desired password

    // Unlock Functionality
    unlockBtn.addEventListener("click", () => {
        if (passwordInput.value === PASSWORD) {
            passwordPopup.style.display = "none";
            mainContainer.style.display = "flex";
        } else {
            errorMsg.textContent = "❌ Incorrect password. Try again.";
            errorMsg.style.color = "red";
        }
    });

    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") unlockBtn.click();
    });

    // Investment Calculation Elements
    const invInput = document.querySelector("#initial-investment");
    const stepInput = document.querySelector("#step-count");
    const percentageInput = document.querySelector("#percentage");
    const resultSteps = document.querySelector("#step-results");
    const totalInvestment = document.querySelector("#total-investment");
    const estimatedProfit = document.querySelector("#estimated-profit");
    const calculateBtn = document.querySelector("#calculate");
    const resetBtn = document.querySelector("#reset");

    function generateSteps() {
        let inv = Number(invInput.value);
        let steps = Math.min(Number(stepInput.value), 100);
        let percentage = Number(percentageInput.value) / 100;
        
        resultSteps.innerHTML = "";
        let values = [];
        let totalInvested = 0;

        for (let i = 0; i < steps; i++) {
            let amount = inv * Math.pow(1 + (1 / percentage), i);
            amount = Math.round(amount);
            values.push(amount);
            totalInvested += amount;
        }

        totalInvestment.innerHTML = `💰 Total Investment: <strong>$${totalInvested}</strong>`;
        estimatedProfit.innerHTML = `📈 Estimated Profit: <strong>$${(inv * percentage * steps).toFixed(2)}</strong>`;

        values.forEach(value => {
            let stepBubble = document.createElement("span");
            stepBubble.classList.add("step-bubble");
            stepBubble.textContent = value;
            resultSteps.appendChild(stepBubble);
        });
    }

    calculateBtn.addEventListener("click", generateSteps);

    resetBtn.addEventListener("click", () => {
        invInput.value = "1";
        stepInput.value = "5";
        percentageInput.value = "85";
        resultSteps.innerHTML = "";
        totalInvestment.innerHTML = "";
        estimatedProfit.innerHTML = "";
    });
});
