document.addEventListener("DOMContentLoaded", () => {
    const passwordModal = document.querySelector(".password-modal");
    const passwordInput = document.querySelector("#password");
    const unlockButton = document.querySelector("#unlock");
    const passwordError = document.querySelector("#password-error");
    const mainContainer = document.querySelector(".main-container");

    const PASSWORD = "1234";

    unlockButton.addEventListener("click", () => {
        if (passwordInput.value.trim() === PASSWORD) {
            passwordModal.style.display = "none";
            mainContainer.classList.add("visible");
            mainContainer.style.display = "flex";
        } else {
            passwordError.textContent = "Incorrect password. Try again.";
        }
    });

    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") unlockButton.click();
    });

    // Form calculations
    const invInput = document.querySelector("#initial-investment");
    const stepInput = document.querySelector("#step-count");
    const percentageInput = document.querySelector("#percentage");
    const calculateBtn = document.querySelector("#calculate");
    const resetBtn = document.querySelector("#reset");
    const stepResults = document.querySelector("#step-results");
    const totalInvestment = document.querySelector("#total-investment");
    const estimatedProfit = document.querySelector("#estimated-profit");

    calculateBtn.addEventListener("click", () => {
        let investment = parseFloat(invInput.value);
        let steps = parseInt(stepInput.value);
        let percentage = parseFloat(percentageInput.value) / 100;
        
        stepResults.innerHTML = "";
        let total = 0;

        for (let i = 0; i < steps; i++) {
            investment *= (1 + percentage);
            total += investment;
            let span = document.createElement("span");
            span.textContent = `$${investment.toFixed(2)}`;
            stepResults.appendChild(span);
        }

        totalInvestment.textContent = `Total Investment: $${total.toFixed(2)}`;
        estimatedProfit.textContent = `Estimated Profit: $${(total - invInput.value).toFixed(2)}`;
    });

    resetBtn.addEventListener("click", () => {
        stepResults.innerHTML = "";
        totalInvestment.textContent = "";
        estimatedProfit.textContent = "";
    });
});
