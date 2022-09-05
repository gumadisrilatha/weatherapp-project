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

//currentweather

function displayCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function citySearch(city) {
  let apiKey = "050d010a9f000c2568ace67ee4ada4de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
  axios.get(apiUrl).then(emojis);
}

//searcing city
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  citySearch(city);

  //let h1 = document.querySelector("h1");
  // h1.innerHTML = `${searchInput.value}`;
}

function emojis(response) {
  let sky = response.data.weather[0].main;
  let skyNow = document.querySelector("#weather-emoji");
  if (sky === "Clear") {
    skyNow.innerHTML = "☀️";
  } else if (sky === "Clouds") {
    skyNow.innerHTML = "🌤";
  } else if (sky === "Drizzle") {
    skyNow.innerHTML = "🌨";
  } else if (sky === "Rain") {
    skyNow.innerHTML = "🌧";
  } else if (sky === "Thunderstorm") {
    skyNow.innerHTML = "⚡️";
  } else if (sky === "Snow") {
    skyNow.innerHTML = "❄️";
  }
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
