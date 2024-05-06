const mysql = require("mysql");
require("dotenv").config();

// console.log(process.env.DB_user, process.env.DB_pass);
const db = mysql.createConnection({
  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_pass,
  database: "jagatirta",
});

module.exports = db;
