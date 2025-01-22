import { getRequiredWeatherData } from "./weather";

function btnSearchEventHandler() {
  let btnSearch = document.querySelector("#btnSearch");
  let textLocation = document.querySelector("#textLocation");
  btnSearch.addEventListener("click", async () => {
    try {
      let data = await getRequiredWeatherData(textLocation.value);
      for (let i = 0; i < data.length; i++) {
        createWeatherElement(data[i]);
      }
      console.log(data);
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
  let description = document.createElement("p");

  weatherContainer.appendChild(weatherElement);
  weatherElement.appendChild(weatherElementImage);
  // weatherElementImage.src = "";
  weatherElement.appendChild(weatherElementData);
  weatherElementData.appendChild(location);
  location.textContent = data.location;
  weatherElementData.appendChild(date);
  date.textContent = data.date;
  weatherElementData.appendChild(temperature);
  temperature.textContent = `${data.temperature} \u00B0C`;
  weatherElementData.appendChild(description);
  description.textContent = data.description;
}

function setupEventHandlers() {
  btnSearchEventHandler();
}

export { setupEventHandlers };
