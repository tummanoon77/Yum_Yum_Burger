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
app.post("/api/burgers", function(req, res) {
  
  connection.query("INSERT INTO burgers (name) VALUES (?)", [req.body.name], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new plan
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});
app.put("/api/burgers/:id", function(req, res) {
  connection.query("UPDATE plans SET burger = ? WHERE id = ?", [req.body.name, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a plan
app.delete("/api/burgers/:id", function(req, res) {
  connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});
app.get("/api/burgers/:devoured", function(req, res) {
  burgers.forEach( burger =>{

    if ( burger.devoured === "TRUE") {
      
  res.render("index",{burgers:burger});
    }
  })
});

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
