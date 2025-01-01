const express = require('express');
const cors = require('cors');
require('dotenv').config();
var morgan = require('morgan');

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(cors({
  origin:'http://localhost:3000',
  optionsSuccessStatus: 200,
}));

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});