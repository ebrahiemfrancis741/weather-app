/*
  Returns weather data of the current and next 14 days
*/
async function getWeatherOfLocation(location) {
  try {
    let weatherResponse = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=3MF7GXXA8SLJ8P9GQEZS7GTRJ&contentType=json`
    );
    let weatherData = await weatherResponse.json();
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

/*
  Return an array of objects containing only the data we 
  want from the data received from the API
*/
async function getRequiredWeatherData(location) {
  let data = await getWeatherOfLocation(location);
  if (data == undefined) {
    return undefined;
  }
  let requiredData = [];
  for (let i = 0; i < 7; i++) {
    requiredData.push({
      location: data.resolvedAddress,
      date: data.days[i].datetime,
      temperature: data.days[i].temp,
      conditions: data.days[i].conditions,
      icon: data.days[i].icon,
    });
  }
  return requiredData;
}

export { getRequiredWeatherData };
