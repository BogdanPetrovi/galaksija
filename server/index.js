const express = require('express');
const cors = require('cors');
require('dotenv').config();
var morgan = require('morgan');
var bodyParser = require('body-parser')
const db = require('./db/database')
const mqtt = require('mqtt')

const app = express()
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cors({
  optionsSuccessStatus: 200,
}));

const options = {
  username: process.env.MQTTUSERNAME,
  password: process.env.MQTTPASSWORD,
};
const mqttUrl = process.env.MQTTURL;

const client = mqtt.connect(mqttUrl, options);

app.get('/water-the-plant', (req,res) => {
  const plant = req.query.plant;
  client.publish('test', plant)
  res.status(200).send(`Upsensno ste zalili biljku "${plant}"`)
})

app.post('/get-device-data', async (req, res) => {
  try {
    const mac = req.body.mac;
    const data = await db.query('SELECT id, vreme, temperatura, vlaznost FROM informacije WHERE mac = ? ORDER BY vreme DESC ;', [mac])
    res.status(200).json({"status": "success", "data": data[0]})
  } catch (err) {
    console.log(err)
    res.status(400).json({"status": "failure", "message": err.sqlMessage || 'Server error or bad request'})
  }
})

app.get('/add-device-data', async (req, res) => {
  try {
    const mac = req.query.mac;
    const senzor = req.query.senzor;
    const temperatura = req.query.temperatura;
    const vlaznost = req.query.vlaznost
    const result = await db.query('INSERT INTO informacije (mac, senzor, temperatura, vlaznost) VALUES (?, ?, ?, ?);',
    [mac, senzor, temperatura, vlaznost]);
    res.status(200).json({"status": "success", "message": "Inserted data succesfully"})
  } catch (err) {
    console.log(err)
    res.status(401).json({"status": "failure", "message": err.sqlMessage || 'Server error or bad request'})
  }
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
