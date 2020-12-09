require("dotenv").config({ path: ".env.local" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./server/routes/api");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/citiesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", api);

app.listen(process.env.PORT, function () {
  console.log(`Running server on port ${process.env.PORT}`);
});
