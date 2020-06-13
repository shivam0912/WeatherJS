const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const windPressureElement = document.querySelector(".wind-pressure p");
const timeElement = document.querySelector(".time-zone p");
const windSpeedElement = document.querySelector(".wind-speed p");
const inputElement = document.querySelector("#inputName");

// Create an object for data

const weather = {};
const weatherChange = {};

weatherChange.temperature = {
  unit: "c",
};
// API key
const key = "0a5084f9840148ebbc943335201306";

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function inputPress(e) {
  if (inputElement.value == " ") {
    window.alert("Please enter city name");
  } else {
    const cityName = inputElement.value;
    getWeather(cityName);
  }
}
inputElement.addEventListener("keypress", inputPress);

// get Weather
function getWeather(cityName) {
  let api = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cityName}`;
  console.log(api);
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature = data.current.temp_c;
      weather.description = data.current.condition.text;
      weather.iconId = data.current.condition.icon;
      weather.city = data.location.name;
      weather.state = data.location.region;
      weather.country = data.location.country;
      weather.pressure = data.current.pressure_mb;
      weather.time = data.location.localtime;
      weather.speed = data.current.wind_kph;
      weather.farhenheit = data.current.temp_f;
    })
    .then(function () {
      displayWeather();
    });
}

// Display data
function displayWeather() {
  iconElement.innerHTML = `<img src='${weather.iconId}' alt="Weather" border="0"></a>`;

  tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;

  descElement.innerHTML = weather.description;

  locationElement.innerHTML = `${weather.city}, ${weather.state} , ${weather.country}`;

  windPressureElement.innerHTML = ` <span>pressure</span> ${weather.pressure} <span>hPa</span>`;

  timeElement.innerHTML = ` ${weather.time}`;

  windSpeedElement.innerHTML = `<span>wind speed</span> ${weather.speed}<span>km/h</span>`;
}

// Switch Celesius to Fahrenheit

tempElement.addEventListener("click", function () {
  if (weather.temperature === undefined) return;
  if (weatherChange.temperature.unit === "c") {
    tempElement.innerHTML = `${weather.farhenheit}°<span>F</span>`;
    weatherChange.temperature.unit = "f";
  } else {
    tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
    weatherChange.temperature.unit = "c";
  }
});
