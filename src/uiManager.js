import { getRequiredWeatherData } from "./weather";

function btnSearchEventHandler() {
  let btnSearch = document.querySelector("#btnSearch");
  let textLocation = document.querySelector("#textLocation");
  btnSearch.addEventListener("click", async () => {
    try {
      let data = await getRequiredWeatherData(textLocation.value);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

function setupEventHandlers() {
  btnSearchEventHandler();
}

export { setupEventHandlers };
