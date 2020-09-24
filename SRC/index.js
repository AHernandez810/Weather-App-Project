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
