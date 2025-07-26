const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const connect_databse = require("./database/db")
const dotenv = require('dotenv')
dotenv.config()
connect_databse();
app.get('/', (req, res) => {
  res.send("Hello, it's the backend of School Master Pro");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
