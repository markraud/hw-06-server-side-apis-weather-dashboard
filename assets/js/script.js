
$(document).ready(function () {
    console.log("ready!");

    var searchCityBtn = document.querySelector('#search-btn');

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


    searchCityBtn.addEventListener('click', function (event) {
        event.preventDefault();
        var temp;
        var humidity;
        var windSpeed;
        var uvIndex;
        var lat;
        var lon;
        var uvi;

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
                temp = data.main.temp;
                humidity = data.main.humidity;
                windSpeed = data.wind.speed;
                lat = data.coord.lat;
                lon = data.coord.lon;
                uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f1d7def2b5aef9f0636bcc751ef47a58";
                console.log(temp);
                console.log(humidity);
                console.log(windSpeed);
                console.log(lon);
                console.log(lat);
                // $("#currentCity").html("<div>this is a test</div");

            })
            .then(function () {
                fetch(uvURL)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        uvi = data.value;

                    })
                console.log(currentCity);
                $("#current-city").html("<h3>" + currentCity + "</h3>");  //this isn't working for some reason
                $("#current-city").html("<div>This is the temperature:" + temp + "</div");
            });
    });

});
