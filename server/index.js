const express = require('express');
const cors = require('cors');
require('dotenv').config();
var morgan = require('morgan');
var bodyParser = require('body-parser')
const db = require('./db/database')
const mqtt = require('mqtt')
var cookieParser = require('cookie-parser')
const { encrypt, decrypt } = require('./config/encryption');

const app = express()
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000',
  // origin: 'https://galaksija-nine.vercel.app',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));
app.use(cookieParser());

const options = {
  username: process.env.MQTTUSERNAME,
  password: process.env.MQTTPASSWORD,
};
const mqttUrl = process.env.MQTTURL;
const client = mqtt.connect(mqttUrl, options);

app.post('/water-the-plant', (req,res) => {
  const plant = req.body.plant;
  client.publish('poruka', plant)
  res.status(200).send(`Upsensno ste zalili biljku "${plant}"`)
})

app.get('/sensor-data', async (req, res) => {
  try {
    const mac = req.query.mac;
    const sensor = req.query.senzor;
    const data = await db.query('SELECT id, vreme, temperatura, vlaznost FROM informacije WHERE mac = ? AND senzor = ? ORDER BY vreme DESC LIMIT 8;', [mac, sensor])
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

app.get('/get-mac', (req, res) => {
  const encMac = req.cookies.usrid;
  if(encMac){
    res.cookie('usrid', encMac, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4, 
    })
    const mac = decrypt(encMac);
    res.status(200).json({"status": "success", "mac": mac})
  } else {
    res.status(200).json({"status": "success"})
  }
})

app.post('/update-mac', (req,res) => {
  const mac = req.body.mac;

  res.cookie('usrid', encrypt(mac) , {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
  });

  res.send({message: "Success"})
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
