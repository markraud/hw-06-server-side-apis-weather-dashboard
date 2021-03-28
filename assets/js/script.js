
$(document).ready(function () {
    console.log("ready!");

    var searchCityBtn = document.querySelector('#search-btn');

    
    searchCityBtn.addEventListener('click', function (event) {
        event.preventDefault();
        var temp ='';
        var humidity ='';
        var windSpeed ='';
        var uvIndex ='';
        var lat ='';
        var lon ='';
        var uvi ='';
        var city ='';
        var icon ='';

        var currentCity = document.querySelector('#inlineFormInput').value;
        var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&APPID=f1d7def2b5aef9f0636bcc751ef47a58";
        //console.log(openWeatherURL);
        var uvUrl ='';
        var forecastUrl ='';
        var iconUrl ='';
        var tag ='';
        var currentDate = moment();

        fetch(openWeatherURL)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                //console.log(data);
                city = data.name;
                temp = data.main.temp;
                humidity = data.main.humidity;
                windSpeed = data.wind.speed;
                lat = data.coord.lat;
                lon = data.coord.lon;
                icon= data.weather[0].icon;
                uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f1d7def2b5aef9f0636bcc751ef47a58";
                forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=f1d7def2b5aef9f0636bcc751ef47a58";
                iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
                // console.log(temp);
                // console.log(humidity);
                // console.log(windSpeed);
                // console.log(lon);
                // console.log(lat);
                // console.log(city);
                $("#intro").hide();
                $("#current-city").append("<div class='h2 p-2 ml-2 d-inline-block font-weight-bold mr-2'>" + city + "</div>");
                //var currentDate = moment();
                $("#current-city").append("(" + currentDate.format('L') +")");
                tag = '<img src="' + iconUrl + '" alt="weather icon">'
                $("#current-city").append(tag);

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
                        $("#current-city").append("<div class='p-2 m-2'>UV Index: " + uvi + "</div>");
                    })
            })
            .then(function () { // another fetch to get the 5 day forcast
                //console.log(forecastUrl);
                fetch(forecastUrl)
                    .then(function (res){
                        return res.json();
                    })
                    .then(function (data) {
                        // var x = data.list[2].dt_txt
                        // var x2 = x.split(' ');
                        // console.log('recieved data', x2);
                        forcast="";
                        $.each(data.list, function(index, val) {
                            // grab forcast objects in data.list for hour = 12 so we get 1 forcast per day
                            if (((val.dt_txt.split(' '))[1]) === '12:00:00' ) {
                                //format the date to Gregorian style
                                forecastDate = val.dt_txt.split(' ')[0];
                                forecastDate = (forecastDate.split("-"));
                                gregDate = forecastDate[1] + "-" + forecastDate[2] + "-" + forecastDate[0];
                                console.log(gregDate);
                                // inject forcast to html
                                forcast += "<div class='card bg-primary text-white p-2 m-2' style='width: 10rem;>" // Open div for card tag
                                forcast += "<div class='card-body'>"
                                forcast += "<h6 class='card-title'>" + gregDate + "</h6>" 
                                forcast += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
                                forcast += "<div>Temp: " + val.main.temp + " ℉ </div>"
                                forcast += "<div>Humidity: " + val.main.humidity + " %</div>"
                                forcast += "</div>"    // close card body
                                forcast += "</div>" // Close div for card tag
                                $('#forcastTitle').removeClass('d-none');
                                $("#forecastInfo").html(forcast);
                            }
                          });
                        //console.log(data.list);
                        //console.log(forcast);
                        
                        // $("#forecastTitle").append(`<div class='card bg-primary text-white p-2 m-2' style='width: 10rem;'>
                        //                                 <div class='card-body'>
                        //                                     <h6 id='day-2' class='card-title'></h6>
                        //                                 </div>
                        //                             </div>`);
                        // $("#day-2").append(day2);
                        // $("#day-2").append();   // append icon
                        // $("#day-2").append();   // append temp
                        // $("#day-2").append();   // append humidity




                    })
            })
        
    });
});
