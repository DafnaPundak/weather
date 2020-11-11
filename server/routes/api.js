const express = require("express");
const router = express.Router();
const request = require("request");
const City = require("../model/City");

router.get(`/city/:cityName`, (req, res) => {
  const apiKey = "3b530711ed9b615278423b60491c7929";
  let cityName = req.params.cityName;
  request.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        response = JSON.parse(response.body);
        temp = Number((response.main.temp) - 273.15).toFixed(2)
        response.main.temp = temp
        res.send(response);
      }
    }
  );
});

router.get(`/cities`, (req, res) => {
  City.find({}, function (err, cities) {
    res.send(cities);
  });
});

router.post(`/city`, (req, res) => {
  let newCity = new City({
    name: req.body.name,
    temperature: req.body.temperature,
    condition: req.body.condition,
    conditionPic: req.body.conditionPic,
    humidity: req.body.humidity,
  });
  newCity.save({}, function (err, cities) {
    res.send(cities);
  });
});

router.delete(`/city/:cityName`, (req, res) => {
  let cityToRemove = req.params.cityName;
  City.deleteOne({ name: cityToRemove }, function (err, cities) {
    res.send(cities);
  });
});

router.put(`/city/:cityName`, (req, res) => {
  const apiKey = "3b530711ed9b615278423b60491c7929";
  let cityName = req.params.cityName;
  request.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    function (error, response, body) {
      City.update({}, function (err, cities) {
        res.send(cities);
      });
    }
  );
});

module.exports = router;
