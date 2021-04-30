const key = 'c0f7737df304db2a7cccd09f85deb062';
let baseurl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let button = document.getElementById('searchbtn');
let cityInput = document.getElementById('searchtext');
let cityName = document.getElementById('cityname');
let temperature = document.getElementById('temp');
let humidity = document.getElementById('humid');
let icon = document.getElementById('icon');
let temp, t = 0;

if(button) {
    button.addEventListener('click', getWeather);
}

if(cityInput) {
    cityInput.addEventListener('keyup', (event) => {
        if(event.key === 'Enter') {
            getWeather();
        }
    });
}

if(temperature) {
     temperature.addEventListener('click', toggleTemp);
}

function toggleTemp() {
    if(t == 0) 
        temperature.innerHTML = parseInt(temp) + "°F";
    else 
        temperature.innerHTML = parseInt(temp - 273) + '°C';
    t = t^1;
}

function getWeather() {
    let finalUrl = baseurl + cityInput.value + '&appid=' + key;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', finalUrl, true);
    xhr.onload = () => {
        let weatherData = JSON.parse(xhr.responseText);
        console.log(weatherData);
        cityName.innerHTML = weatherData.name;
        temp = weatherData.main.temp;
        temperature.innerHTML = parseInt(temp - 273) + '°C';
        humidity.innerHTML = weatherData.main.humidity + '%'; 
        icon.src = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"; 
    }
    xhr.send();
}


