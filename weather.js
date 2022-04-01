const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", function (req, res) {

  res.sendFile(__dirname + "/weather.html");

})

app.post("/", function (req, res) {
  const city = req.body.city ;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+",india&appid=57608648e03eb597468383cd56c41d21&units=metric"
  https.get(url, (response) => {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const location = weatherData.name;
      const temprature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
     res.render(__dirname + "/output.pug", {location:location,temprature:temprature,description:description,imgUrl:imgUrl});
      // res.write("<h1> Location : " + location + "</h1>")
      // res.write("<h1>temprature : " + temprature + "</h1>")
      // res.write("<h1>weather : " + description + "</h1>")
      // res.write("<img src=" + imgUrl + ">")
      // res.send()
    })
  })
})

app.listen(3000, function () {
  console.log("server in running on 3000.")
})
