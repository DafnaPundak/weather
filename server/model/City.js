const mongoose = require("mongoose")
const Schema = mongoose.Schema

const citySchema = new Schema ({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

// const c1 = new City ({ name: "Paris", temperature: 300})
// console.log(c1)
// c1.save()

const City = mongoose.model("city", citySchema)
module.exports = City
