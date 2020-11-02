const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const url = ("https://api.openweathermap.org/data/2.5/weather?q=Sabadell&units=metric&APPID=f18bc7b86643d6ffa4f93b6d87008e1b");

    https.get(url, function(response){
        console.log(response.statusCode);
    })

    res.send("Server is up and running...")
});

app.listen(3000, function(){
    console.log("Server is running in port 3000");
});