$(document).on(function() {

    var tempF = "";
    var windspeed = "";
    var humidity = "";
    var name = "";
    var index = "";
    var queryUrl = "";
    var searchTerm = "";
    var arr = new Array;
    var UV = "";
    var date = new Date;
    var city = "";
    var listItem= "";
    var temperature= "";
    var card = "";
    var cardBody = "";
    var cityDate = "";
    var wind = "";
    var image = "";







city = $("#searchTerm").val();

const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";
 date = new Date();

$("#searchTerm").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {

  $('#forecastH5').addClass('show');

  city = $("#searchTerm").val();
  
  $("#searchTerm").val("");  

  
  queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){

   

     tempF = (response.main.temp - 273.15) * 1.80 + 32;

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
  });

  function makeList() {
     listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }

  function getCurrentConditions (response) {

   
    tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

     card = $("<div>").addClass("card");
     cardBody = $("<div>").addClass("card-body");
     city = $("<h4>").addClass("card-title").text(response.name);
     cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
     temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
     humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
     wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
     image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
   
  }

function getCurrentForecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    console.log(response)
    console.log(response.dt)
    $('#forecast').empty();

  
    let results = response.list;
    console.log(results)
    

    for (let i = 0; i < results.length; i++) {

      let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(hour);

      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
         temp = (results[i].main.temp - 273.15) * 1.80 + 32;
         tempF = Math.floor(temp);

         card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
         cardBody = $("<div>").addClass("card-body p-3 forecastBody")
         cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
         temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
         humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

         image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

      }
    }
  });

}
   
});
