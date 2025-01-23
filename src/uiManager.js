import { getRequiredWeatherData } from "./weather";
import { getImage } from "./image";

function btnSearchEventHandler() {
  let btnSearch = document.querySelector("#btnSearch");
  let textLocation = document.querySelector("#textLocation");
  let inputError = document.querySelector(".input-error");
  let loadingIcon = document.querySelector("#icon-loading-search");

  btnSearch.addEventListener("click", async () => {
    try {
      loadingIcon.classList.toggle("active");
      let data = await getRequiredWeatherData(textLocation.value);
      if (data == undefined) {
        inputError.textContent = `${textLocation.value} is not a valid location`;
        loadingIcon.classList.toggle("active");
        return;
      } else {
        inputError.textContent = "";
      }
      loadingIcon.classList.toggle("active");
      displayAllRequiredData(data);
    } catch (error) {
      console.log(error);
    }
  });
}

function displayAllRequiredData(data) {
  let weatherContainer = document.querySelector(".weather-container");
  weatherContainer.replaceChildren();
  for (let i = 0; i < data.length; i++) {
    createWeatherElement(data[i]);
  }
}

/*
  If use presses enter after typing in 'textLocation' input field, 
  the page will reload because of the default behavior of the 
  form element, so we need to stop that
*/
function formSearchEventHandler() {
  let formSearch = document.querySelector("#formSearch");
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
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
  let btnToggle = document.querySelector("#btn-toggle");
  let toggleState = btnToggle.getAttribute("data-ebs-toggle-value");

  weatherContainer.appendChild(weatherElement);
  weatherElement.classList.add("weather");
  weatherElement.appendChild(weatherElementImage);
  weatherElementImage.classList.add("weather-image");
  getImage(`weather: ${data.icon}`).then((result) => {
    weatherElementImage.src = result.data.images.original.url;
  });
  weatherElement.appendChild(weatherElementData);
  weatherElementData.classList.add("weather-data");

  weatherElementData.appendChild(location);
  location.textContent = data.location;
  weatherElementData.appendChild(date);
  date.textContent = data.date;
  weatherElementData.appendChild(temperature);

  // if we should display farenheit
  if (toggleState != "0") {
    let farenheit = parseFloat(data.temperature) * (9 / 5) + 32;
    temperature.textContent = `${farenheit.toFixed(1)} \u00B0F`;
  } else {
    temperature.textContent = `${data.temperature} \u00B0C`;
  }

  temperature.classList.add("weather-data-temperature");
  weatherElementData.appendChild(conditions);
  conditions.textContent = data.conditions;
}

function btnToggleEventHandler() {
  let btnToggle = document.querySelector("#btn-toggle");
  btnToggle.addEventListener("click", () => {
    if (btnToggle.getAttribute("data-ebs-toggle-value") == "0") {
      btnToggle.classList.add("active");
      btnToggle.setAttribute("data-ebs-toggle-value", "1");
    } else if (btnToggle.getAttribute("data-ebs-toggle-value") == "1") {
      btnToggle.classList.remove("active");
      btnToggle.setAttribute("data-ebs-toggle-value", "0");
    }
    toggleDegrees();
  });
}

/*
  Toggles the display of the temperature to 
  either celsius or farenheit
*/
function toggleDegrees() {
  let btnToggle = document.querySelector("#btn-toggle");
  let toggleState = btnToggle.getAttribute("data-ebs-toggle-value");
  let temperatureElementList = document.querySelectorAll(
    ".weather-data-temperature"
  );
  let temperature;
  for (let i = 0; i < temperatureElementList.length; i++) {
    // get the temperature value
    temperature = parseFloat(
      temperatureElementList.item(i).textContent.split(" ")
    );
    // if temperatures should be in celsius
    if (toggleState == "0") {
      // convert to celsius
      temperature = (temperature - 32) * (5 / 9);
      temperatureElementList.item(i).textContent = `${temperature.toFixed(
        1
      )} \u00B0C`;
    } else {
      // if temperatures should be in farenheit
      temperature = temperature * (9 / 5) + 32;
      temperatureElementList.item(i).textContent = `${temperature.toFixed(
        1
      )} \u00B0F`;
    }
  }
}

function setupEventHandlers() {
  btnSearchEventHandler();
  formSearchEventHandler();
  btnToggleEventHandler();
}

export { setupEventHandlers };
