var express = require('express')

var PORT = process.env.PORT || 3000

var app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extenede: true }))
app.use(express.json())

// set handlebars
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// import routes and give server access
var routes = require('./controllers/burgersController.js')

app.use(routes);

app.listen(PORT, () => {
  console.log('Server is listening on: http://localhost:' + PORT)
})
