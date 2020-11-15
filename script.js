const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
const searchBtn = $("searchBtn");
const searchTerm = $("searchTerm");

const temp = $("temperature");
const humidity = $("humidity");
const windspd = $("windspeed");
const card = $("card")

const cityName = $("cityName");
const currentDate = $("current")
const searchHst = $("history")

if (JSON.parse(localStorage.getItem("searchHst")) === null) {
  console.log("No history")
}

$("#searchBtn").on("click", function () {

  $('#forecast').addClass('show');

  searchBtn = $("#searchTerm").val();

  $("#searchTerm").val("");

});

function searchHistory(cityName) {
  searchHst.empty();
  const searchHstArr = JSON.parse(localStorage.getItem("searchHistory"));

}
function weatherStats(cityName, temp, humidity, windspeed) {

  cityName.text(cityName)
  temp.text(`Temperature: ${temp} F`);
  windspd.text(`windspeed: ${windspeed} MPH`);
  currentDate.text(`(${current})`);
  humidity.text(`Humidity: ${humidity}`);

}

function weather(city) {
  let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })

    .then(function (weatherData) {
      const cityObject = {
        temp: weatherData.main.name,
        humidity: weatherData.main.name,
        windspeed: weatherData.wind.speed,
        cityNmae: weatherData.name,
      }
    })
}




