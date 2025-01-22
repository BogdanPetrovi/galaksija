const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}).promise();

module.exports = db;