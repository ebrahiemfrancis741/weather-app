
async function getWeatherOfLocation(location) {
  try{
    let weatherResponse = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=3MF7GXXA8SLJ8P9GQEZS7GTRJ&contentType=json`
    );
    let weatherData = await weatherResponse.json();
    return weatherData;
  } catch(error){
    console.log(error)
  }
}

getWeatherOfLocation("Cape town");