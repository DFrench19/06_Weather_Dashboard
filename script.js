let apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
let searchBtn = $("searchBtn");
let searchTerm = $("searchTerm");

let temp = $("temperature");
let humidity = $("humidity");
let windspd = $("windspeed");
let card = $("card")

let cityName = $("cityName");
let currentDate = $("current")
let searchHst = $("history")
let uvIndexEl = $("uvIndex");


if (JSON.parse(localStorage.getItem("searchHst")) === null) {
  console.log("No history")
}

searchBtn.on("click", function(s) {
  s.preventDefault();
  if (searchTerm.val() === "") {
      alert("Enter a city");
      return;
  }

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
  uvIndexEl.text(`UV Index: ${uvVal}`);

}

function weather(city) {
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

  $.ajax({
    url: queryUrl,
    method: "GET",
    success: function (response) {
      console.log(response);
    }
  })

    .then(function (weatherData) {
      let cityObject = {
        temp: weatherData.main.name,
        humidity: weatherData.main.name,
        windspeed: weatherData.wind.speed,
        cityName: weatherData.name,
        cityUVIndex: weatherData.coord,
      }
    })
}

function forcast() {
  card.empty();
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

  $.ajax({
    url: queryUrl,
    method: "GET",
    success: function (response) {
      console.log(response);
    }
  })
    .then(function (forcastReponse) {
      for (const i = 0; i != forcastReponse.list.length; i += 8) {
        const cityObject = {
          date: forcastReponse.list[i].dt_txt,
          temp: forcastReponse.list[i].main.temp,
          humidity: forcastReponse.list[i].main.humidity
        }
        const dateStr = cityObject.date;
        const date = dateStr.substring(0, 10);

        ForecastCard(date, cityObject.temp, cityObject.humidity);
      }
    })
}

function ForecastCard(date, temp, humidity) {


  const forcastCard = $("<div>").attr("class", "Forcast-card");
  const cardDate = $("<h3>").attr("class", "card-text");
  const cardTemp = $("<p>").attr("class", "card-text");
  const cardHumidity = $("<p>").attr("class", "card-text");

  cardRow.append(forcastCard);
  cardDate.text(date);
  cardTemp.text(`Temp: ${temp} °F`);
  cardHumidity.text(`Humidity: ${humidity}%`);
  forcastCard.append(cardDate, cardTemp, cardHumidity);
}


