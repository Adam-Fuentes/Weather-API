const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const url = ("https://api.openweathermap.org/data/2.5/weather?q=Sabadell&units=metric&APPID=f18bc7b86643d6ffa4f93b6d87008e1b");

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            console.log(icon);

            console.log(weatherDescription);
            console.log(temp);

            res.write("<h1>La temperatura en Sabadell es de: " + temp + " grados</h1>")
            res.write("<p>El tiempo será " + weatherDescription + "</p>");
            res.write("<img src="+imgURL+"></img>");
            res.send();//si no se pone esto no acaba el proceso
        });
    });
});

app.listen(3000, function(){
    console.log("Server is running in port 3000");
});