let now = new Date();
let currentDate = document.querySelector(".currentDate");

let date = now.getDate();

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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

currentDate.innerHTML = `Today is ${day} ${month} ${date} ${year}`;

let currentTime = document.querySelector(".currentTime");
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
currentTime.innerHTML = `${hours} : ${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let inputSearch = document.querySelector(".location");
  if (searchInput.value) {
    inputSearch.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please type a city");
  }
  let apiKey = "03aebc038ecf36ac244a3fcaa0014291";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let city = searchInput.value;
  let apiUrl = `${apiEndpoint}&q=${city}&appid=${apiKey}&units=${units}`;

  function showData(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let varTemp = document.querySelector("#numberTemp");
    varTemp.innerHTML = temperature;

    let weatherTextData = response.data.weather[0].description;
    let weatherText = document.querySelector(".weather-now-text");
    weatherText.innerHTML = weatherTextData;

    let humidityValue = response.data.main.humidity;
    let humidityPlace = document.querySelector(".humidityData");
    humidityPlace.innerHTML = humidityValue;

    let windSpeedValue = response.data.wind.speed;
    let windPlace = document.querySelector(".windData");
    windPlace.innerHTML = `${windSpeedValue} km/h`;
  }
  axios.get(apiUrl).then(showData);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKeyCurrent = "03aebc038ecf36ac244a3fcaa0014291";
  let units = "metric";
  let apiEndpointCurrent = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrlCurrent = `${apiEndpointCurrent}&lat=${latitude}&lon=${longitude}&appid=${apiKeyCurrent}&units=${units}`;
  //console.log(apiUrlCurrent);

  function getCurrentData(response) {
    console.log(response);
    let city = response.data.name;

    let changeCity = document.querySelector(".location");
    changeCity.innerHTML = city;

    let temperature = Math.round(response.data.main.temp);

    let changeTemp = document.querySelector("#numberTemp");
    changeTemp.innerHTML = temperature;

    let weatherTextData = response.data.weather[0].description;
    let weatherText = document.querySelector(".weather-now-text");
    weatherText.innerHTML = weatherTextData;

    let humidityValue = response.data.main.humidity;
    let humidityPlace = document.querySelector(".humidityData");
    humidityPlace.innerHTML = humidityValue;

    let windSpeedValue = response.data.wind.speed;
    let windPlace = document.querySelector(".windData");
    windPlace.innerHTML = `${windSpeedValue} km/h`;
  }

  axios.get(apiUrlCurrent).then(getCurrentData);
}
function showCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".currentButton");
button.addEventListener("click", showCurrent);
