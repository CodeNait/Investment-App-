let portfolioChart;
let dividendChart;
let stockPriceChart;
let stocks = {};  // Store stock data

document.getElementById('add-stock-button').addEventListener('click', addStock);
document.getElementById('save-stock-button').addEventListener('click', saveStock);

function addStock() {
    const stockName = prompt('Enter stock name:');
    if (stockName && !stocks[stockName]) {
        stocks[stockName] = getStockData();
        createStockButton(stockName);
    } else {
        alert('Stock name is required and must be unique.');
    }
}

function saveStock() {
    const stockName = document.getElementById('stockName').value;
    if (stockName) {
        stocks[stockName] = getStockData();
    } else {
        alert('Stock name is required.');
    }
}

function getStockData() {
    return {
        initialInvestment: parseFloat(document.getElementById('initialInvestment').value),
        annualDividendPercent: parseFloat(document.getElementById('annualDividendPercent').value) / 100 || 0,
        annualDividendValue: parseFloat(document.getElementById('annualDividendValue').value) || 0,
        dividendGrowth: parseFloat(document.getElementById('dividendGrowth').value) / 100,
        stockGrowth: parseFloat(document.getElementById('stockGrowth').value) / 100,
        timeHorizon: parseInt(document.getElementById('timeHorizon').value)
    };
}

function createStockButton(stockName) {
    const button = document.createElement('button');
    button.textContent = stockName;
    button.addEventListener('click', () => selectStock(stockName));
    document.getElementById('stock-buttons').appendChild(button);
}

function selectStock(stockName) {
    const stockData = stocks[stockName];
    document.getElementById('stockName').value = stockName;
    document.getElementById('initialInvestment').value = stockData.initialInvestment;
    document.getElementById('annualDividendPercent').value = stockData.annualDividendPercent * 100;
    document.getElementById('annualDividendValue').value = stockData.annualDividendValue;
    document.getElementById('dividendGrowth').value = stockData.dividendGrowth * 100;
    document.getElementById('stockGrowth').value = stockData.stockGrowth * 100;
    document.getElementById('timeHorizon').value = stockData.timeHorizon;

    calculateInvestment();
}

function calculateInvestment() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const annualDividendPercent = parseFloat(document.getElementById('annualDividendPercent').value) / 100 || 0;
    const annualDividendValue = parseFloat(document.getElementById('annualDividendValue').value) || 0;
    const dividendGrowth = parseFloat(document.getElementById('dividendGrowth').value) / 100;
    const stockGrowth = parseFloat(document.getElementById('stockGrowth').value) / 100;
    const timeHorizon = parseInt(document.getElementById('timeHorizon').value);

    let totalValue = initialInvestment;
    let dividendPerYear = annualDividendValue > 0 ? annualDividendValue : initialInvestment * annualDividendPercent;

    const years = [];
    const portfolioValues = [];
    const dividendValues = [];
    const stockPrices = [];

    for (let i = 0; i <= timeHorizon; i++) {
        years.push(i);
        portfolioValues.push(totalValue);
        dividendValues.push(dividendPerYear);
        stockPrices.push(totalValue / initialInvestment);

        if (i < timeHorizon) {
            totalValue += dividendPerYear;
            totalValue *= (1 + stockGrowth);

            dividendPerYear *= (1 + dividendGrowth);
        }
    }

    document.getElementById('finalValue').textContent = `Total value after ${timeHorizon} years: $${totalValue.toFixed(2)}`;

    updatePortfolioValueChart(years, portfolioValues);
    updateDividendValueChart(years, dividendValues);
    updateStockPriceChart(years, stockPrices);
}

function updatePortfolioValueChart(years, portfolioValues) {
    const ctx = document.getElementById('portfolioValueChart').getContext('2d');
    if (portfolioChart) {
        portfolioChart.destroy();
    }
    portfolioChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Portfolio Value',
                data: portfolioValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value ($)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function updateDividendValueChart(years, dividendValues) {
    const ctx = document.getElementById('dividendValueChart').getContext('2d');
    if (dividendChart) {
        dividendChart.destroy();
    }
    dividendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Dividend Value',
                data: dividendValues,
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value ($)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function updateStockPriceChart(years, stockPrices) {
    const ctx = document.getElementById('stockPriceChart').getContext('2d');
    if (stockPriceChart) {
        stockPriceChart.destroy();
    }
    stockPriceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Stock Price (Multiple of Initial)',
                data: stockPrices,
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Multiple'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
