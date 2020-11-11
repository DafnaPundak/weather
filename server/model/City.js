const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  temperature: Number,
  condition: String,
  conditionPic: String,
  humidity: Number,
});

const City = mongoose.model("city", citySchema);
module.exports = City;
