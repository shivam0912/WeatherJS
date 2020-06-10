const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const windPressureElement = document.querySelector(".wind-pressure p");
const humidityElement = document.querySelector(".humidity p");
const windSpeedElement = document.querySelector(".wind-speed p");

// Create an object for data

const weather = {};
weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;

// API key
const key = "7294234a162e0681119c9c32dee10ebe";

// Check browser support geolocation or not
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}

// Set User Position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}
/* // Get the time
function getTime() {
  var d = new Date();
  var n = d.toLocaleTimeString();
  console.log(n);
}
 */
// If any problem show error
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
// get Weather
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.pressure = data.main.pressure;
      weather.humidity = data.main.humidity;
      weather.speed = Math.floor(data.wind.speed * 3.6);
    })
    .then(function () {
      displayWeather();
    });
}

// Display data
function displayWeather() {
  iconElement.innerHTML = `<img src="icon/${weather.iconId}.png" />`;

  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;

  descElement.innerHTML = weather.description;

  locationElement.innerHTML = `${weather.city} , ${weather.country}`;

  windPressureElement.innerHTML = ` ${weather.pressure} <span>hPa</span>`;

  humidityElement.innerHTML = `<span>humidity</span> ${weather.humidity}%`;

  windSpeedElement.innerHTML = `${weather.speed} <span>km/h</span>`;
}

function celesuiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

// Switch Celesius to Fahrenheit
tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit === "celsius") {
    let farhenheit = celesuiusToFahrenheit(weather.temperature.value);

    //round the number
    farhenheit = Math.floor(farhenheit);
    tempElement.innerHTML = `${farhenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
