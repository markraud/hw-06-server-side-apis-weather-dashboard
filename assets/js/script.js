
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
                uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f1d7def2b5aef9f0636bcc751ef47a58";
                console.log(temp);
                console.log(humidity);
                console.log(windSpeed);
                console.log(lon);
                console.log(lat);
                console.log(city);
                console.log(icon);
                // $("#currentCity").html("<div>this is a test</div");

            })
            .then(function () {
                fetch(uvURL)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        uvi = data.value;
                        console.log(uvi);

                    })
                // console.log(uvi);
                $("#intro").hide();
                //$("#intro").addClass("d-none")
                $("#current-city").children().first().text(city);
                var currentDate = moment();
                $("#current-city").append("(" + currentDate.format('L') +")");
                $("#current-city").append("<div class='y-1'>Temperature: " + temp + " ℉</div>");
                $("#current-city").append("<div>Humidity: " + humidity + "</div>");
                $("#current-city").append("<div>UV Index: " + uvi + "</div>");



            });
    });

});
