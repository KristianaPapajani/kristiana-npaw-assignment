let myChart;
let refreshInterval = 10000; // Default refresh interval set to 10 seconds
let intervalId;

const BASE_URL = 'https://api.npaw.com';
const ACCOUNT_CODE = '/powerce';
const TOKENS = {
    'last6hours': '8b774a4529782e46fdaab505a3f50450',
    'last24hours': '2ffa3340844108cff2c1a260e562b4f9',
    'thisweek': '8a4505909867416af15d52b32c31c307'
};
const DATE_TOKENS = {
    'last6hours': '1753825797809',
    'last24hours': '1753831978981',
    'thisweek': '1753832382662'
};

async function fetchDataAndRenderChart() {
    try {
        const url = constructApiUrl();
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Something went wrong while calling the API');
        }
        const apiResponse = await response.json();

        // Extract only views data per hour
        const usData = apiResponse.data[0];
        const metricsData = usData.metrics[0].values[0].data;

        // Inject API views data to chart
        const labels = metricsData.map(item => new Date(item[0]));
        const values = metricsData.map(item => item[1]);

        const selectedRange = document.getElementById('dateRange').value;
        const timeUnit = selectedRange === 'thisweek' ? 'day' : 'hour';

        // Update chart if already exists, create new one if not
        if (myChart) {
            myChart.data.labels = labels;
            myChart.data.datasets[0].data = values;
            myChart.options.scales.x.time.displayFormats = {
                hour: 'MMM dd HH:mm',
                day: 'MMM dd'
            };
            myChart.update();
        } else {
            const ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'No. of plays',
                        data: values,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: timeUnit,
                                displayFormats: {
                                    hour: 'MMM dd HH:mm',
                                    day: 'MMM dd'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Plays'
                            },
                            ticks: {
                                precision: 0
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function startInterval() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(fetchDataAndRenderChart, refreshInterval);
}

// Construct API url based on parameters and the correct token based on time range user input
function constructApiUrl() {
    const fromDate = document.getElementById('dateRange').value;
    const type = 'all';
    const granularity = 'hour';
    const metrics = 'views';
    const filter = '[{"name":"Kristiana IP","rules":{"IP":["108.5.255.35"]}}]';
    const dateToken = DATE_TOKENS[fromDate];
    const token = TOKENS[fromDate];

    const params = new URLSearchParams({
        fromDate,
        type,
        granularity,
        metrics,
        filter,
        dateToken
    });

    return `${BASE_URL}${ACCOUNT_CODE}/data?${params.toString()}&token=${token}`;
}

// Call API to get data and popuate chart
fetchDataAndRenderChart();
startInterval();

// Method to update the interval and time range based on users input
document.getElementById('updateIntervalButton').addEventListener('click', () => {
    const newInterval = document.getElementById('refreshInterval').value;
    if (newInterval && !isNaN(newInterval) && newInterval > 0) {
        refreshInterval = newInterval * 1000;
    }
    fetchDataAndRenderChart(); // Refresh data on button click
    startInterval(); // Restart the interval with new selection
});
