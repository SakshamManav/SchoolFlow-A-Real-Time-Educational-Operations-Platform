const mysql = require("mysql2");
const dotenv = require('dotenv')
dotenv.config()
const db = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: process.env.db_password, 
  database: "schoolmaster",
});
function connect_databse(){
    console.log(process.env.db_password)
    db.connect((err) => {
  if (err) {
    console.error("Unable to connect to database:", err);
  } else {
    console.log("Database is connected successfully!!");
  }
});

}

module.exports = connect_databse;
