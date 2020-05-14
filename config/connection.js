const mysql = require('mysql')

const connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'burgers_db',
    password: 'AuraZaira77'
  })
}
