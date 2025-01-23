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

// Frontend uzima podatke za prikaz
app.get('/get-device-data', async (req, res) => {
  // Try Catch blok se koristi u JS aplikacijama da se ne bi crashovale. Ukoliko imamo gresku pri funkciji u try bloku, aplikacija nece puci nego ce uraditi zadato u catch bloku. Takodje u catch bloku mozemo doci do greske
  try {
    const mac = req.body.mac; // Ovo ce se citati iz kolacica, ali za sad ovako
    // Uzimam samo odredjene kolone i stitim da korisnik nikad ne moze da vidi IP adresu korisnika
    const data = await db.query('SELECT id, vreme, temperatura, vlaznost FROM informacije WHERE mac = ? ORDER BY vreme DESC ;', [mac])
    // Potvrdjujemo klijentu da je sve proslo kako treba i saljemo mu podatke
    res.status(200).json({"status": "success", "data": data[0]})
  } catch (err) {
    console.log(err)
    // Ukoliko je doslo do greske, obavestavam klijenta i kazujem mu sta je prouzrokovalo gresku
    res.status(400).json({"status": "failure", "message": err.sqlMessage || 'Server error or bad request'})
  }
})

// Mikrokontroler upisuje podatke u bazu
app.post('/add-device-data', async (req, res) => {
  try {
    // Zbog 12. reda, ova aplikacija ce citati JSON fajlove koje joj posaljemo. Za testing koristim Postman, a u frontend aplikaciji uz request na path dodajem i JSON fajl. Ovde u konstantnoj 'data' cuvam taj JSON fajl
    //Primer JSON fajla koji saljem: {
    //  "data": {
    //      "mac": "0f:59:df:8c:ab:18",
    //      "ip": "192.168.0.24",
    //      "senzor": "B",
    //      "temperatura": "22",
    //      "vlaznost": "70"
    //   }
    //}
    const data = req.body.data;
    // Upisujem podatke u bazu
    await db.query('INSERT INTO informacije (mac, ip, senzor, temperatura, vlaznost) VALUES (?, ?, ?, ?, ?);',
    [data.mac, data.ip, data.senzor, data.temperatura, data.vlaznost]);
    // Potvrdjujem klijentu da je sve proslo kako treba
    res.status(200).json({"status": "success", "message": "Inserted data succesfully"})
  } catch (err) {
    console.log(err)
    res.status(400).json({"status": "failure", "message": err.sqlMessage || 'Server error or bad request'})
  }
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
