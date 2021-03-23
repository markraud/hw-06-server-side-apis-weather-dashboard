
var searchCityBtn = document.querySelector('#search-btn');
var currentCity = document.querySelector('#inlineFormInput').value;
console.log(currentCity);

function searchCity(city) {
    console.log(city);
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&APPID=f1d7def2b5aef9f0636bcc751ef47a58";
    console.log(openWeatherURL);

    fetch(openWeatherURL)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
      $("#currentCity").html("<div>this is a test</div");
    });
}

// $("#search-city").click(function(){
//     searchCity();
// })



// function handleSearchFormSubmit(event) {
//     event.preventDefault();
  
//     var currentCity = document.querySelector('#inlineFormInput').value;
//     console.log(currentCity);
    
//     if (!currentCity) {
//       console.error('You need a search input value!');
//       return;
//     }
  
//     searchCity(currentCity);
//   }
  

searchCityBtn.addEventListener('submit',searchCity(currentCity));
