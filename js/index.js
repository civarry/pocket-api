import { getWeatherData, getWeatherIcon } from "./weather-api.js";
import { getNewsData } from "./news-api.js";
import { fetchActivity } from "./bored-api.js";

const weatherButton = document.getElementById("weather-button");
weatherButton.addEventListener("click", showWeatherContent);

const newsButton = document.getElementById("news-button");
newsButton.addEventListener("click", showNewsContent);

const movieButton = document.getElementById("bored-button");
movieButton.addEventListener("click", showBoredContent);

const calculatorButton = document.getElementById("calculator-button");
calculatorButton.addEventListener("click", showCalculatorContent);
const contentContainer = document.getElementById("content-container");

function showWeatherContent() {
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
      const card = document.getElementById("weather-card");
      weatherDataDiv.classList.add("weather-data");

      let defaultLocation = input.value || "Philippines";

      async function updateWeather(location) {
        try {
          const data = await getWeatherData(location);
          locationSpan.textContent = data.name;
          temperatureSpan.textContent = `${(data.main.temp - 273.15).toFixed(
            2
          )}°c`;
          humidity.textContent = `${data.main.humidity}%`;
          windspeed.textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
          const { icon, gradient } = getWeatherIcon(
            data.weather[0].description
          );
          weatherIconImg.src = `/icons/weatherIcons/${icon}`;
          card.style.background = gradient;
        } catch (error) {
          console.error(error);
          // Handle the error
        }
      }

      // Update weather for default location
      updateWeather(defaultLocation);

      // Handle form submit event
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const location = input.value;
        updateWeather(location);
      });
    });
}

async function showNewsContent() {
  const response = await fetch("html/news-content.html", { method: "GET" });
  const html = await response.text();

  contentContainer.innerHTML = html;
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const cardList = document.querySelector(".card-list");

  const defaultSearchQuery = "Philippines";
  const getData = async (searchQuery) => {
    const data = await getNewsData(searchQuery);
    const articles = data.articles;
    if (articles.length === 0) {
      cardList.innerHTML = '<p class="no-news-found">No matches found.</p>';
      return;
    }
    const cardListItems = articles
      .map(
        ({ title, image, url, description, publishedAt, source }) => `
        <div class="card card-list__item">
          <div class="card-image-container">
            <img class="card-image" src="${image}" alt="${title}">
          </div>
          <div class="card-content">
            <span class="card-date">${new Date(publishedAt).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "short", year: "numeric" }
            )} / ${
          source
            ? `<a href="${source.url}" target="_blank">${source.name}</a>`
            : "null"
        }</span>
            <h3 class="card-title"><a href="${url}" target="_blank">${title}</a></h3>
            <p class="card-description">${description}</p>
          </div>
        </div>
      `
      )
      .join("");
    cardList.innerHTML = cardListItems;
  };

  searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value || defaultSearchQuery;
    getData(searchQuery).catch((error) => console.log(error));
  });

  await getData(defaultSearchQuery).catch((error) => console.log(error));
}

function showBoredContent() {
  fetch("html/bored-content.html")
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;
      // Call fetchActivity() once when the page loads to display the initial activity
      fetchActivity();

      // Add a click event listener to the "Get Another Activity" button to fetch and display a new activity when clicked
      document
        .querySelector("#get-activity")
        .addEventListener("click", fetchActivity);
    });
}

function showCalculatorContent() {
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

// this is for the preloader
let loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

// this is for wallpaper changing
document.addEventListener("keydown", function (e) {
  // check if the key pressed is 'W' or 'w' and the alt key is held down
  if ((e.key === "w" || e.key === "W") && e.altKey) {
    try {
      // create an input element and set its type to file
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      // listen for the change event on the file input
      fileInput.addEventListener("change", function () {
        // set the background image of the tablet-inner element to the selected file
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          document.querySelector(
            ".tablet-inner"
          ).style.backgroundImage = `url('${reader.result}')`;
        };
        reader.readAsDataURL(file);
      });
      // trigger a click event on the file input to open the file dialog
      fileInput.click();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});
