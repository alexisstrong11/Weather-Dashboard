// Constants for API key and API endpoint (replace with your own)
const apiKey = '27465417c7a63f9c3522ab2c431e5590';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5';

// DOM elements
const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const currentWeather = document.querySelector('.current-weather');
const forecastData = document.querySelector('.forecast-data');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        // Fetch current weather data
        fetch(`${apiEndpoint}/weather?q=${location}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                // Display current weather data
                currentWeather.innerHTML = `
                    <p>Location: ${data.name}, ${data.sys.country}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
            })
            .catch(error => console.error('Error fetching current weather:', error));

        // Fetch five-day weather forecast data
        fetch(`${apiEndpoint}/forecast?q=${location}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Display the complete five-day weather forecast data
        const forecastList = data.list;

        // Create an object to store forecasts for each day of the week
        const dailyForecasts = {};

        forecastList.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });

            if (!dailyForecasts[day]) {
                dailyForecasts[day] = {
                    temperature: forecast.main.temp,
                    description: forecast.weather[0].description,
                };
            }
        });

        forecastData.innerHTML = '';

        // Iterate through the dailyForecasts object and display the data
        for (const day in dailyForecasts) {
            const { temperature, description } = dailyForecasts[day];
            forecastData.innerHTML += `
                <div class="forecast-item">
                    <p>${day}</p>
                    <p>${temperature}°C</p>
                    <p>${description}</p>
                </div>
            `;
        }

            })
            .catch(error => console.error('Error fetching five-day weather forecast:', error));
    }
});
