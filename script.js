function calculateInvestment() {
    let totalMoney = parseFloat($("#totalMoney").val());
    let userSteps = parseInt($("#steps").val());
    let steps = isNaN(userSteps) || userSteps <= 0 ? autoBestSteps(totalMoney) : userSteps;

    $("#steps").attr("placeholder", userSteps > 0 ? userSteps : "Best Possible");

    let remainingMoney = totalMoney;
    let investmentData = [];
    let totalProfit = 0;
    let lossCount = 0;
    let winCount = 0;
    let lossPositions = generateLossPositions(steps);

    for (let i = 1; i <= steps; i++) {
        let investAmount = remainingMoney * getRandomFloat(0.2, 0.4);
        remainingMoney -= investAmount;

        let win = !lossPositions.includes(i);
        let profitLoss = win ? investAmount * 0.8 : -investAmount;
        totalProfit += profitLoss;

        if (win) winCount++;
        else lossCount++;

        investmentData.push({ step: i, invest: investAmount, profitLoss: profitLoss, win });
    }

    displayResults(investmentData, totalMoney);
}

function autoBestSteps(totalMoney) {
    if (totalMoney <= 100) return getRandomInt(4, 6);
    if (totalMoney <= 500) return getRandomInt(6, 8);
    return getRandomInt(8, 10);
}

function generateLossPositions(totalSteps) {
    let lossPositions = new Set();
    while (lossPositions.size < 2) {
        lossPositions.add(getRandomInt(1, totalSteps));
    }
    return [...lossPositions];
}

function displayResults(investmentData, totalMoney) {
    let tableBody = $("#investmentTable tbody");
    tableBody.html("");

    let totalInvested = 0, totalProfit = 0;
    let profitTrend = [];

    investmentData.forEach(({ step, invest, profitLoss, win }) => {
        totalInvested += invest;
        totalProfit += profitLoss;
        profitTrend.push(totalProfit);

        let row = `<tr>
            <td>Step ${step}</td>
            <td>$${invest.toFixed(2)}</td>
            <td class="${profitLoss >= 0 ? 'profit' : 'loss'}">
                ${win ? "✅" : "❌"} $${profitLoss.toFixed(2)}
            </td>
        </tr>`;
        tableBody.append(row);
    });

    let finalAmount = totalMoney + totalProfit;
    let maxProfitLossText = `Total Investment: $${totalMoney.toFixed(2)} | Final Amount: $${finalAmount.toFixed(2)} | Profit: $${totalProfit.toFixed(2)}`;
    $("#maxProfitLoss").text(maxProfitLossText);

    renderGraph(profitTrend);
}

function renderGraph(profitTrend) {
    let ctx = document.getElementById("profitChart").getContext("2d");
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: profitTrend.length }, (_, i) => `Step ${i + 1}`),
            datasets: [{
                label: "Cumulative Profit",
                data: profitTrend,
                borderColor: "yellow",
                fill: false
            }]
        },
        options: { responsive: true }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

