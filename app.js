const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));//código necesario para el body parser

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html")
    
});

app.post("/", function(req, res){
    //console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "f18bc7b86643d6ffa4f93b6d87008e1b";
    const unit = "metric";

    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&APPID=" + apiKey);

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

            res.write("<h1>La temperatura en "+ query + " es de: " + temp + " grados</h1>")
            res.write("<p>El tiempo será " + weatherDescription + "</p>");
            res.write("<img src="+imgURL+"></img>");
            res.send();//si no se pone esto no acaba el proceso
        });
    });
});

app.listen(3000, function(){
    console.log("Server is running in port 3000");
});
/*
*/