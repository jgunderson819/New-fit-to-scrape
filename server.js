const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(_dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "public")));

app.use("/", routes);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//If deployed, use the deployed database. Otherwise use the local Robo 3T database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Set mongoose to leverage built in Javascript ES6 Promises
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
console.log("URI", MONGODB_URI);

app.listen(PORT, function () {
  console.log("Listening at localhost:${PORT}");
});

module.exports = app;
