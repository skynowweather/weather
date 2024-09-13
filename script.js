const apiKey = '75878812bd994bbab9f23420241209'; // Replace with your actual API key

async function getWeather() {
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

function displayWeather(data) {
    // Location and weather condition
    const locationWeatherHtml = `
        <h1>${data.location.name}, ${data.location.country}</h1>
        <h1>${data.current.temp_f
