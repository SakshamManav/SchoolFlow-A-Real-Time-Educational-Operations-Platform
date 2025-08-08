const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello, it's the backend of School Master Pro");
});

app.use("/api/auth", require("./routes/admin/auth.js"));
app.use("/schooluser", require("./routes/admin/User_School_admin_route.js"));
app.use("/student", require("./routes/admin/StudentRoute.js"));
app.use("/fees", require("./routes/admin/FeesRoute.js"));
app.use("/feeshistory", require("./routes/admin/FeesHistoryRoute.js"));
app.use("/teacher", require("./routes/admin/teacherRoute.js"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
