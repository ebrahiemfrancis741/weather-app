import { getRequiredWeatherData } from "./weather";
import { getImage } from "./image";

function btnSearchEventHandler() {
  let btnSearch = document.querySelector("#btnSearch");
  let textLocation = document.querySelector("#textLocation");
  btnSearch.addEventListener("click", async () => {
    try {
      let data = await getRequiredWeatherData(textLocation.value);
      for (let i = 0; i < data.length; i++) {
        createWeatherElement(data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

function createWeatherElement(data) {
  let weatherContainer = document.querySelector(".weather-container");
  let weatherElementImage = document.createElement("img");
  let weatherElementData = document.createElement("div");
  let weatherElement = document.createElement("div");
  let location = document.createElement("p");
  let date = document.createElement("p");
  let temperature = document.createElement("p");
  let conditions = document.createElement("p");

  weatherContainer.replaceChildren();
  weatherContainer.appendChild(weatherElement);
  weatherElement.classList.add("weather");
  weatherElement.appendChild(weatherElementImage);
  weatherElementImage.classList.add("weather-image");
  getImage(`weather: ${data.icon}`).then(result =>{
    console.log(result.data.images.original.url);
    weatherElementImage.src = result.data.images.original.url;
  });
  weatherElement.appendChild(weatherElementData);
  weatherElementData.classList.add("weather-data");

  weatherElementData.appendChild(location);
  location.textContent = data.location;
  weatherElementData.appendChild(date);
  date.textContent = data.date;
  weatherElementData.appendChild(temperature);
  temperature.textContent = `${data.temperature} \u00B0C`;
  weatherElementData.appendChild(conditions);
  conditions.textContent = data.conditions;
}

function setupEventHandlers() {
  btnSearchEventHandler();
}

export { setupEventHandlers };
