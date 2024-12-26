const getWeatherButton = document.getElementById("get-weather");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherResult = document.getElementById("weather-result");
const removebutton = document.getElementById('remove-button')

const apiKey = "346f67d1421f4797b7985731242312";

getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});
removebutton.addEventListener("click", () => {
  weatherResult.style.display = "none";
  removebutton.style.display = "none";
  cityInput.value = ""; 
});

function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  console.log("Fetching weather data for:", city);

  fetch(url)
    .then((response) => {
      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather data:", data);
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
}

document.getElementById("weather-result").style.display = "none";
document.getElementById("remove-button").style.display=none

function displayWeather(data) {
  cityName.textContent = `City: ${data.location.name}`;
  temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
  description.textContent = `Description: ${data.current.condition.text}`;
    weatherResult.style.display = "block";
removebutton.style.display="block"
}


