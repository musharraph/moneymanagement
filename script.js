function calculateInvestment() {
    let totalMoney = parseFloat(document.getElementById("totalMoney").value);
    let steps = parseInt(document.getElementById("steps").value);
    let mode = document.getElementById("mode").value;
    let tableBody = document.querySelector("#investmentTable tbody");
    
    if (isNaN(totalMoney) || totalMoney <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    tableBody.innerHTML = "";
    
    let investments = [];
    let profits = [];
    let totalProfit = 0;
    
    for (let i = 1; i <= steps; i++) {
        let investedAmount;
        if (mode === "auto") {
            investedAmount = (totalMoney / steps).toFixed(2);
        } else {
            investedAmount = prompt(`Enter amount for Step ${i}:`, (totalMoney / steps).toFixed(2));
            investedAmount = parseFloat(investedAmount);
        }
        
        let profitLoss = getRandomProfitLoss(investedAmount);
        investments.push(investedAmount);
        profits.push(profitLoss);
        totalProfit += profitLoss;

        let row = `<tr>
            <td>Step ${i}</td>
            <td>USD ${investedAmount}</td>
            <td style="color:${profitLoss >= 0 ? 'lightgreen' : 'red'}">USD ${profitLoss}</td>
        </tr>`;
        
        tableBody.innerHTML += row;
    }

    document.getElementById("maxProfitLoss").innerText = `Total Profit/Loss:USD ${totalProfit}`;

    updateGraph(investments, profits);
}

function getRandomProfitLoss(amount) {
    let riskFactor = Math.random();
    let profit = (amount * (0.05 + riskFactor * 0.15)).toFixed(2);
    let loss = (amount * (0.02 + riskFactor * 0.1)).toFixed(2);
    return Math.random() > 0.5 ? parseFloat(profit) : -parseFloat(loss);
}

function updateGraph(investments, profits) {
    let ctx = document.getElementById("profitChart").getContext("2d");
    
    if (window.profitChartInstance) {
        window.profitChartInstance.destroy();
    }

    window.profitChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: investments.map((_, i) => `Step ${i + 1}`),
            datasets: [
                {
                    label: "Profit/Loss",
                    data: profits,
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    borderColor: "green",
                    borderWidth: 2
                }
            ]
        }
    });
}
