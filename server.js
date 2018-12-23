const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT;

const db = require("./models");

const app = express();

const exphbs = require("express-handlebars");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

 const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoTweets";
//  const MONGODB_URI =  "mongodb://localhost/mongoTweets";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main",
    })
  );
  app.set("view engine", "handlebars");

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});





