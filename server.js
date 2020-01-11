const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const app = express()

const mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost/citiesDB", {useNewUrlParser: true})
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yourDB', {useNewUrlParser: true})


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)

const port = 3000
app.listen(process.env.PORT ||port, function () {
    console.log(`Running server on port ${port}`)
})