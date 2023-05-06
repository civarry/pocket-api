export function getWeatherData(location) {
  const apiKey = "895785f1b3701f72471f6320a2c75a84";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem fetching weather data:", error);
      throw error;
    });
}

export function getWeatherIcon(description) {
  let icon = "clear.png"; // Default icon for clear weather
  let gradient = "linear-gradient(135deg, #00feba, #5b548a)";

  // Check the weather description and assign the corresponding icon
  if (description.includes("clear")) {
    icon = "clear.png";
    gradient = "linear-gradient(135deg, #00feba, #5b548a)";
  } else if (description.includes("clouds")) {
    icon = "clouds.png";
    gradient = "linear-gradient(135deg, #92b6d5, #4f8ab8)";
  } else if (description.includes("drizzle") || description.includes("rain")) {
    icon = "rain.png";
    gradient = "linear-gradient(135deg, #b6cbe0, #5c88bd)";
  } else if (description.includes("mist")) {
    icon = "mist.png";
    gradient = "linear-gradient(135deg, #c0c0c0, #808080)";
  } else if (description.includes("snow")) {
    icon = "snow.png";
    gradient = "linear-gradient(135deg, #b3d7e8, #5c8fb4)";
  }

  // Return the icon filename
  return {
    icon: icon,
    gradient: gradient,
  };
}
