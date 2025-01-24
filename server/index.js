const express = require('express');
const cors = require('cors');
require('dotenv').config();
var morgan = require('morgan');
var bodyParser = require('body-parser')
const db = require('./db/database')

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cors({
  optionsSuccessStatus: 200,
}));

app.get('/get-device-data', async (req, res) => {
  try {
    const mac = req.body.mac;
    const data = await db.query('SELECT id, vreme, temperatura, vlaznost FROM informacije WHERE mac = ? ORDER BY vreme DESC ;', [mac])
    res.status(200).json({"status": "success", "data": data[0]})
  } catch (err) {
    console.log(err)
    res.status(400).json({"status": "failure", "message": err.sqlMessage || 'Server error or bad request'})
  }
})

app.post('/add-device-data', async (req, res) => {
  try {
    const data = req.body.data;
    await db.query('INSERT INTO informacije (mac, ip, senzor, temperatura, vlaznost) VALUES (?, ?, ?, ?, ?);',
    [data.mac, data.ip, data.senzor, data.temperatura, data.vlaznost]);
    res.status(200).json({"status": "success", "message": "Inserted data succesfully"})
  } catch (err) {
    console.log(err)
    res.status(400).json({"status": "failure", "message": err.sqlMessage || 'Server error or bad request'})
  }
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
