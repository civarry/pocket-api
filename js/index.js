import { getWeatherData, getWeatherIcon } from "./weather-api.js";

const weatherButton = document.getElementById("weather-button");
weatherButton.addEventListener("click", showWeatherContent);

const newsButton = document.getElementById("news-button");
newsButton.addEventListener("click", showNewsContent);

const movieButton = document.getElementById("movie-button");
movieButton.addEventListener("click", showMovieContent);

const calculatorButton = document.getElementById("calculator-button");
calculatorButton.addEventListener("click", showCalculatorContent);

function showWeatherContent() {
  const contentContainer = document.getElementById("content-container");

  fetch("html/weather-content.html")
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;

      const form = document.getElementById("location-form");
      const input = document.getElementById("location-input");
      const weatherDataDiv = document.getElementById("weather-data");

      if (!weatherDataDiv) {
        console.error("Could not find weather-data element in HTML");
        return;
      }

      const locationSpan = document.getElementById("location");
      const temperatureSpan = document.getElementById("temperature");
      const humidity = document.getElementById("humidity");
      const windspeed = document.getElementById("windspeed");
      const weatherIconImg = document.getElementById("weather-icon");
      weatherDataDiv.classList.add("weather-data");

      const defaultLocation = "Philippines";

      getWeatherData(defaultLocation)
        .then((data) => {
          console.log(data);
          locationSpan.textContent = data.name;
          temperatureSpan.textContent =
            (data.main.temp - 273.15).toFixed(2) + "°c";
          humidity.textContent = data.main.humidity + " %";
          windspeed.textContent = (data.wind.speed * 3.6).toFixed(2) + " km/h";
          const weatherIcon = getWeatherIcon(data.weather[0].description);
          weatherIconImg.src = "/icons/weatherIcons/" + weatherIcon;
          console.log(data.weather[0].description);
        })
        .catch((error) => {
          console.log(error);
          // Handle the error
        });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const location = input.value;
        getWeatherData(location)
          .then((data) => {
            console.log(data);
            locationSpan.textContent = data.name;
            temperatureSpan.textContent =
              (data.main.temp - 273.15).toFixed(2) + "°c";
            humidity.textContent = data.main.humidity + " %";
            windspeed.textContent =
              (data.wind.speed * 3.6).toFixed(2) + " km/h";
            const weatherIcon = getWeatherIcon(data.weather[0].description);
            weatherIconImg.src = "/icons/weatherIcons/" + weatherIcon;
          })
          .catch((error) => {
            console.log(error);
            // Handle the error
          });
      });
    });
}

function showNewsContent() {
  const contentContainer = document.getElementById("content-container");
  fetch("html/news-content.html")
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;
    });
}

function showMovieContent() {
  const contentContainer = document.getElementById("content-container");
  fetch("html/movie-content.html")
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;
    });
}

function showCalculatorContent() {
  const contentContainer = document.getElementById("content-container");
  fetch("html/calculator-content.html")
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;
    });
}
function showMainMenu() {
  const contentContainer = document.getElementById("content-container");
  contentContainer.innerHTML = "";
}
const backButton = document.getElementById("back-button");
backButton.addEventListener("click", showMainMenu);
