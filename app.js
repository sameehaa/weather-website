window.addEventListener('load', ()=>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature")
  let temperatureFeelslike = document.querySelector(".temperature-feelslike")

  const temperatureSpan = document.querySelector(".temperature span")


  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${long}?unitGroup=metric&key=A28KFK2SLSU2G25LFEHHKFY5Z&contentType=json`;

fetch(api)
  .then(response => {
      return response.json();

  })
  .then(data => {
    console.log(data)
    const {temp, conditions, feelslike, icon } = data.currentConditions;
    // Set DOM elements from the API
    temperatureDegree.textContent = temp;
    temperatureDescription.textContent = conditions;
    temperatureFeelslike.textContent = feelslike;
    locationTimezone.textContent = data.timezone;
    // formula for celsius

    let fehrenheit = (temp * 1.8) + 32;

    //set setIcons
      setIcons(icon, document.querySelector('.icon') )

    //change temp to celsius / farenheit
    temperatureSection.addEventListener('click', () => {
      if(temperatureSpan.textContent === "C"){
        temperatureSpan.textContent = "F";
        temperatureDegree.textContent = Math.floor(fehrenheit);
      } else {
        temperatureSpan.textContent = "C";
        temperatureDegree.textContent = temp;
      }
    });
  });
});
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcons = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcons]);

  }
});
