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


function weatherStats(cityName) {


  const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    type: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response);


      $("#weather").empty();

       temperature = response.data[0].text("Temperature: "+ temF + "F")
       humidity = response.data[0].text("Humidity: " + results[i].main.humidity)
      



    }

    
  });



}

