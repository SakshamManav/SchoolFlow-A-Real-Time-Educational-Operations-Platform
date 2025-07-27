// database/db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.db_password,
  database: "schoolmaster",
});

module.exports = db;
