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


app.use("/api/auth", authRoutes); // authentication
app.use("/schooluser", require("./routes/User_School_admin_route.js"))
app.use("/student", require("./routes/StudentRoute.js") )
app.use("/fees", require("./routes/FeesRoute.js"))
app.use("/feeshistory", require("./routes/FeesHistoryRoute.js"))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
