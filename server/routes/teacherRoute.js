const express = require('express');
const router = express.Router();
const teacherQueries = require('../models/teacher');
const authenticateToken = require('../middleware/authMiddleware'); // Your JWT middleware
const db = require('../database/db'); // Your DB connection pool
const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key"; // Ensure this matches your middleware

// Middleware for basic input validation
const validateTeacherData = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required' });
  }
  next();
};

// Create a new teacher (protected)
router.post('/create', authenticateToken, validateTeacherData, async (req, res) => {
  try {
    const teacherId = await teacherQueries.createTeacher(db, req.body, req.user.id);
    res.status(201).json({ id: teacherId, message: 'Teacher created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating teacher', details: error.message });
  }
});

// Get all teachers for the authenticated school (protected)
router.get('/getALL', authenticateToken, async (req, res) => {
  try {
    const teachers = await teacherQueries.getAllTeachers(db, req.user.id);
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching teachers', details: error.message });
  }
});

// Get teacher by ID for the authenticated school (protected)
router.get('/get/:id', authenticateToken, async (req, res) => {
  try {
    const teacher = await teacherQueries.getTeacherById(db, req.params.id, req.user.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found or not in your school' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching teacher', details: error.message });
  }
});

// Update teacher (protected)
router.put('/update/:id', authenticateToken, validateTeacherData, async (req, res) => {
  try {
    const affectedRows = await teacherQueries.updateTeacher(db, req.params.id, req.body, req.user.id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found or not in your school' });
    }
    res.json({ message: 'Teacher updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating teacher', details: error.message });
  }
});

// Delete teacher (soft delete, protected)
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    const affectedRows = await teacherQueries.deleteTeacher(db, req.params.id, req.user.id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found or not in your school' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting teacher', details: error.message });
  }
});

// Teacher login (public)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const teacher = await teacherQueries.authenticateTeacher(db, email, password);
    if (!teacher) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: teacher.id, email: teacher.email, role: teacher.role, school_id: teacher.school_id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', token, teacher: { id: teacher.id, email: teacher.email, role: teacher.role } });
  } catch (error) {
    res.status(500).json({ error: 'Error during login', details: error.message });
  }
});

module.exports = router;