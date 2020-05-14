const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'))



app.use(express.urlencoded({ extenede: true }))
app.use(express.json())

// Set the port of our application
// process.env.PORT lets the port be set by Heroku

const PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "AuraZaira77",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get('/', function (req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) throw err;

    
    res.render('index', {burgers: data});
  })
})

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  