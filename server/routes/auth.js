const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM school_user WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // remove password before sending user
    delete user.hashed_password;

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// REGISTER (optional)
router.post("/register", async (req, res) => {
  const { name, email, phone, address, logo_url, subscription_plan, password } = req.body;

  try {
    const hashed_password = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO school_user (name, email, phone, address, logo_url, subscription_plan, hashed_password, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [name, email, phone, address, logo_url, subscription_plan, hashed_password]
    );

    res.status(201).json({ message: "Registration successful", user_id: result.insertId });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
