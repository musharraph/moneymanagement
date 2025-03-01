document.addEventListener("DOMContentLoaded", () => {
    const invEntry = document.querySelector(".inv__entry");
    const stepsEntry = document.querySelector(".steps__entry");
    const percentageEntry = document.querySelector(".percentage__entry");
    const resultVals = document.querySelector(".result__vals");
    const totalInvestment = document.querySelector(".total");
    const profitPerSession = document.querySelector(".profit");

    const calculateInvestment = () => {
        let inv = Number(invEntry.value);
        let steps = Number(stepsEntry.value);
        let percentage = Number(percentageEntry.value) / 100;
        
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

    [invEntry, stepsEntry, percentageEntry].forEach(input => {
        input.addEventListener("input", calculateInvestment);
    });

    calculateInvestment();
});
