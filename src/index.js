function formatDate(timestamp) {
  let date=new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

// conversion of degrees
function changeCelsius(event) {
  event.preventDefault();
  let span = document.querySelector(".temp");
  span.innerHTML = 23;
}
let degree = document.querySelector("#celsius-link");
degree.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let span = document.querySelector(".temp");
  span.innerHTML = 66;
}
let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", changeFahrenheit);




function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//currentweather

function displayCurrentWeather(response) {
  
  let cityElement=document.querySelector("#city")
  cityElement.innerHTML = response.data.name;
  
  let temperatureElement=document.querySelector(".temp")
  temperatureElement.innerHTML = Math.round(
    response.data.main.temp
  );
  
 let humidityElement= document.querySelector("#humidity")
 humidityElement.innerHTML = response.data.main.humidity;
  
 let windElement= document.querySelector("#wind")
windElement.innerHTML = Math.round(
    response.data.wind.speed
  );

  let descriptionElement=document.querySelector("#description")
  descriptionElement.innerHTML =
    (response.data.weather[0].main);
  
 let iconElement= document.querySelector("#icon")
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  );
  iconElement.setAttribute('alt', response.data.weather[0].description);
    
  getForecast(response.data.coord);
  
}

function citySearch(city) {
  let apiKey = "050d010a9f000c2568ace67ee4ada4de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
 
}

//searcing city
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  citySearch(city);

  //let h1 = document.querySelector("h1");
  // h1.innerHTML = `${searchInput.value}`;
}



function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "050d010a9f000c2568ace67ee4ada4de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
  axios.get(apiUrl).then(emojis);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let date = document.querySelector("#date");
let currentTime = new Date();
date.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentLocation);
