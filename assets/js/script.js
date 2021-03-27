
$(document).ready(function () {
    console.log("ready!");

    var searchCityBtn = document.querySelector('#search-btn');

    
    searchCityBtn.addEventListener('click', function (event) {
        event.preventDefault();
        var temp;
        var humidity;
        var windSpeed;
        var uvIndex;
        var lat;
        var lon;
        var uvi;
        var city;
        var icon;

        var currentCity = document.querySelector('#inlineFormInput').value;
        console.log(currentCity);
        var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&APPID=f1d7def2b5aef9f0636bcc751ef47a58";
        console.log(openWeatherURL);
        var uvURL;

        fetch(openWeatherURL)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                console.log(data);
                city = data.name;
                temp = data.main.temp;
                humidity = data.main.humidity;
                windSpeed = data.wind.speed;
                lat = data.coord.lat;
                lon = data.coord.lon;
                icon= data.weather[0].icon;
                uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f1d7def2b5aef9f0636bcc751ef47a58";
                console.log(temp);
                console.log(humidity);
                console.log(windSpeed);
                console.log(lon);
                console.log(lat);
                console.log(city);
                console.log(icon);
                $("#intro").hide();
                //$("#intro").addClass("d-none")
                $("#current-city").append("<div class='h2 p-2 ml-2 d-inline-block font-weight-bold mr-2'>" + city + "</div>");
                var currentDate = moment();
                $("#current-city").append("(" + currentDate.format('L') +")");
                $("#current-city").append("<div class='p-2 m-2'>Temperature: " + temp + " ℉</div>");
                $("#current-city").append("<div class='p-2 m-2'>Humidity: " + humidity + "%</div>");
                $("#current-city").append("<div class='p-2 m-2'>Wind Speed: " + windSpeed + " MPH</div>");

            })
            .then(function () {
                fetch(uvUrl)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        uvi = data.value;
                        //$("#uv-index").text("UV Index: " + uvi);
                        $("#current-city").append("<div class='p-2 m-2'>UV Index: " + uvi + "</div>");
                    })
            })
        // another fetch to get the 5 day forcast
        //var forcastUrl = 

    });
});
