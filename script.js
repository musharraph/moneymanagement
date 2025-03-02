function calculateInvestment() {
    let totalMoney = parseFloat(document.getElementById("totalMoney").value);
    if (isNaN(totalMoney) || totalMoney <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    // Determine steps based on investment amount
    let steps;
    if (totalMoney <= 100) steps = getRandomInt(3, 5);
    else if (totalMoney <= 500) steps = getRandomInt(5, 7);
    else steps = getRandomInt(7, 10);

    let remainingMoney = totalMoney;
    let investmentData = [];
    let totalProfit = 0;

    for (let i = 1; i <= steps; i++) {
        let investAmount = remainingMoney * getRandomFloat(0.2, 0.5); // Invest 20-50% of remaining amount
        remainingMoney -= investAmount;

        let profitLoss = investAmount * getRandomFloat(-0.1, 0.3); // Loss (up to -10%) or profit (up to +30%)
        totalProfit += profitLoss;

        investmentData.push({ step: i, invest: investAmount, profitLoss: profitLoss });
    }

    // Adjust last step to ensure total profit
    let lastStep = investmentData[investmentData.length - 1];
    lastStep.profitLoss += Math.max(0, totalMoney * 0.1 - totalProfit); // Ensure at least 10% profit

    // Display results
    displayResults(investmentData, totalMoney);
}

function displayResults(investmentData, totalMoney) {
    let tableBody = document.querySelector("#investmentTable tbody");
    tableBody.innerHTML = ""; // Clear previous data

    let totalInvested = 0, totalProfit = 0;
    let profitTrend = [];

    investmentData.forEach(({ step, invest, profitLoss }) => {
        totalInvested += invest;
        totalProfit += profitLoss;
        profitTrend.push(totalProfit);

        let row = `<tr>
            <td>Step ${step}</td>
            <td>$${invest.toFixed(2)}</td>
            <td class="${profitLoss >= 0 ? 'profit' : 'loss'}">$${profitLoss.toFixed(2)}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    let maxProfitLossText = `Total Investment: $${totalMoney.toFixed(2)} | Final Amount: $${(totalMoney + totalProfit).toFixed(2)} | Profit: $${totalProfit.toFixed(2)}`;
    document.getElementById("maxProfitLoss").textContent = maxProfitLossText;

    renderGraph(profitTrend);
}

function renderGraph(profitTrend) {
    let ctx = document.getElementById("profitChart").getContext("2d");
    if (window.myChart) window.myChart.destroy(); // Destroy previous chart

    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: profitTrend.length }, (_, i) => `Step ${i + 1}`),
            datasets: [{
                label: "Cumulative Profit",
                data: profitTrend,
                borderColor: "green",
                fill: false
            }]
        },
        options: { responsive: true }
    });
}

// Utility functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}
