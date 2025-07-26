const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // ideally from .env

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };
