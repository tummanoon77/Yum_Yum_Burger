const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require("./config/connection");
const app = express();
app.use(express.static('public'))
// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;
const dbConfig = (process.env.NODE_ENV === "production") ? config.heroku : config.db

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extenede: true }))
app.use(express.json())

const connection = mysql.createConnection(dbConfig);
connection.connect(function(err){
  if (err) {
    console.err("error connecting: " + err.stack);
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
app.post("/", function(req, res) {
  // Test it
  // console.log('You sent, ' + req.body.task);

  // Test it
  // return res.send('You sent, ' + req.body.task);

  // When using the MySQL package, we'd use ?s in place of any values to be inserted, which are then swapped out with corresponding elements in the array
  // This helps us avoid an exploit known as SQL injection which we'd be open to if we used string concatenation
  // https://en.wikipedia.org/wiki/SQL_injection
  connection.query("INSERT INTO burgers (name) VALUES (?)", [req.body.name], function(err, result) {
    if (err) throw err;

    res.redirect("/");
  });
});
app.post("/", function(req, res) {
  connection.query("DELETE FROM burgers WHERE (name)", [req.body.name], function(err, result) {
    if (err) throw err;

    res.redirect("/");
  });
});

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  