
function searchApi() {
    var openWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f1d7def2b5aef9f0636bcc751ef47a58';

    fetch(openWeatherURL)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
      $("#currentCity").html("<div>"+data[0]+"</div");
    });
}

searchApi()