const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '0000',
  database: 'world'
});

const selectAll = 'SELECT * FROM city limit 50';

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get('/', function(req, res) {
  res.send(`
    <h1>This is first page</h1>
    <a href="/city">City</a>
  `);
});

app.get('/city', function(req, res) {
  connection.query(selectAll, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        cities: result
      });
    }
  });
});

app.listen(3000);
