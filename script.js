function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        document.getElementById('location-weather').innerHTML = `<p>Please enter a city name.</p>`;
        document.getElementById('weather-info').innerHTML = '';
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=75878812bd994bbab9f23420241209&q=${encodeURIComponent(city)}`;

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

function displayWeather(data) {
    const locationWeatherHtml = `
        <h1>${data.location.name}, ${data.location.country}</h1>
        <h1>${data.current.temp_f} °F</h1>
        <h2>${data.current.condition.text}</h2>
    `;

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
