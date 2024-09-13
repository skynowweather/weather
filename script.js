// Toggle the menu visibility for mobile view
function toggleMenu() {
    document.querySelector('.navbar').classList.toggle('active');
}

// Function to handle weather fetching and display
async function getWeather() {
    const apiKey = '75878812bd994bbab9f23420241209'; // Replace with your actual API key
    const city = document.getElementById('city').value;

    if (!city) {
        document.getElementById('location-weather').innerHTML = `<p>Please enter a city name.</p>`;
        document.getElementById('weather-info').innerHTML = '';
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById('location-weather').innerHTML = `<p>${data.error.message}</p>`;
            document.getElementById('weather-info').innerHTML = '';
        } else {
            displayWeather(data);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('location-weather').innerHTML = `<p>Error fetching data.</p>`;
        document.getElementById('weather-info').innerHTML = '';
    }
}

// Function to display the weather information
function displayWeather(data) {
    // Location and weather condition
    const locationWeatherHtml = `
        <h1>${data.location.name}, ${data.location.country}</h1>
        <h1>${data.current.temp_f} °F</h1>
        <h2>${data.current.condition.text}</h2>
    `;

    // Weather details
    const weatherHtml = `
        <div class="weather-box">
            <p><strong>Feels Like:</strong> ${data.current.feelslike_f} °F</p>
        </div>
        <div class="weather-box">
            <p><strong>UV Index:</strong> ${data.current.uv}</p>
        </div>
        <div class="weather-box">
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        </div>
        <div class="weather-box">
            <p><strong>Wind Speed:</strong> ${data.current.wind_mph} mph</p>
            <p><strong>Wind Direction:</strong> ${data.current.wind_dir}</p>
        </div>
    `;

    document.getElementById('location-weather').innerHTML = locationWeatherHtml;
    document.getElementById('weather-info').innerHTML = weatherHtml;
}

// Event listener for the hamburger menu (if needed)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hamburger')?.addEventListener('click', toggleMenu);
});
