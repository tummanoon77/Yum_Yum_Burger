var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();
app.use(express.static('public'))

app.use(express.urlencoded({ extenede: true }))
app.use(express.json())

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");




app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  