const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../model/City')

// let DBdata = [
//     {
//         name: "Tel-Aviv",
//         temperature: 15,
//         condition: "light rain",
//         conditionPic: `http://openweathermap.org/img/wn/10n@2x.png`
//     }
// ]

router.get(`/city/:cityName`, (req, res) => {
    const apiKey = "3b530711ed9b615278423b60491c7929"
    let cityName = req.params.cityName
    request.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(response)
        }
    })
})

router.get(`/cities`, (req, res) => {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post(`/city`, (req, res) => {
    // let newCity = req.body
    let newCity = new City({
        name: req.body.name,
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic
    })
    // console.log(newCity)
    newCity.save({}, function (err, cities) {
        res.send(cities)
    })
    // DBdata.push(newCity)
    // res.send(DBdata)
})

router.delete(`/city/:cityName`, (req, res) => {
    let cityToRemove = req.params.cityName
    City.remove({ name: cityToRemove }, function (err, cities) {
        res.send(cities)
    })
    // City.remove({name: cityToRemove}).then(cities => {
    //     res.send(cities)
    // })

    // let cities = await City.remove({name: cityToRemove})
    // res.send(cities)
    
    // DBdata = DBdata.filter(city => city.name !== cityToRemove)
    // res.send(DBdata)
})

router.put(`/city/:cityName`, (req, res) => {
    const apiKey = "3b530711ed9b615278423b60491c7929"
    let cityName = req.params.cityName
    request.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`, function (error, response, body) {
        City.update({}, function (err, cities) {
            res.send(cities)
        })
    })
})

module.exports = router