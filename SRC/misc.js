let h5 = document.querySelector("h5");

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let min = now.getMinutes();

h5.innerHTML = `${day} ${hour}:${min}`;

function showWeather(response) {
  let tempDisplay = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  tempDisplay.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".input-bar");
  let city = cityInput.value;
  let cityDisplay = document.querySelector("#location");
  cityDisplay.innerHTML = city;
  let units = "metric";
  let apiKey = "8542b50982e200d0127f4bfc3b2ce168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showTemp(response) {
  let city = response.data.name;
  let cityDisplay = document.querySelector("#location");
  cityDisplay.innerHTML = city;
  let tempDisplay = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  tempDisplay.innerHTML = temperature;
}

function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let units = "metric";
  let apiKey = "8542b50982e200d0127f4bfc3b2ce168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector(
  ".Use-Current-Location-Button"
);
currentLocationButton.addEventListener("click", getCurrentLocation);



let date = document.querySelector("#date");

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let min = now.getMinutes();

date.innerHTML = `${day} ${hour}:${min}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");


  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-${
          forecast.weather[0].icon
        }.png"
      />
      <div class="weather-forecast-temp">
        <strong>
          ${Math.round(forecast.main.temp_max)}Â°
        </strong>
        ${Math.round(forecast.main.temp_min)}Â°
      </div>
    </div>
  `;
  }
}

function search(city) {
  let apiKey = "8542b50982e200d0127f4bfc3b2ce168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


${response.data.weather[0].icon}