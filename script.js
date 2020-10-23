

let city = $("#searchTerm").val();

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

  
  const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;  

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){
   
   let tempF = (response.main.temp - 273.15) * 1.80 + 32;

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

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        tempF = Math.floor(tempF);

    $('#currentCity').empty();

     const card = $("<div>").addClass("card");
     const city = $("<h4>").addClass("card-title").text(response.name);
     const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
     const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
     const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
     const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");

    
    city.append(cityDate)
    card.append(city, temperature, humidity, wind);
    $("#currentCity").append(card)
   
  }

function getCurrentForecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    $('#forecast').empty();

    let results = response.list;
    
    for (let i = 0; i < results.length; i++) {

      let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      let hour = results[i].dt_txt.split('-')[2].split(' ')[1]; 

      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
         let  temp = (results[i].main.temp - 273.15) * 1.80 + 32;
         let tempF = Math.floor(temp);

         const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
         const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
         const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
         const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

  

        card.append(cityDate, temperature, humidity);
        $("#forecast").append(card);

      }
    }
  });

}
   

