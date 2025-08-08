const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    console.log(err)
    res.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = authenticateToken;
