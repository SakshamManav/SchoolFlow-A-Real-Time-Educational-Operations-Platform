const express = require('express');
const router = express.Router();
const teacherQueries = require('../../models/admin/teacher');
const authenticateToken = require('../../middleware/admin/authMiddleware');
const db = require('../../database/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key"; // Ensure this matches your middleware

// Middleware for input validation
const validateTeacherData = (req, res, next) => {
  const { name, email, role } = req.body;
  if (req.method === 'POST' && (!name || !email || !req.body.password || !role)) {
    return res.status(400).json({ error: 'Name, email, password, and role are required' });
  }
  if (req.method === 'PUT' && (!name || !email || !role)) {
    return res.status(400).json({ error: 'Name, email, and role are required' });
  }
  next();
};

// Create a new teacher (protected)
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const teacherId = await teacherQueries.createTeacher(db, req.body, req.user.id);
    res.status(201).json({ id: teacherId, message: 'Teacher created successfully' });
  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({ error: 'Error creating teacher', details: error.message });
  }
});

// Get all teachers for the authenticated school (protected) - root endpoint
router.get('/', authenticateToken, async (req, res) => {
  try {
    const teachers = await teacherQueries.getAllTeachers(db, req.user.id);
    res.json(teachers);
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ error: 'Error fetching teachers', details: error.message });
  }
});

// Get all teachers for the authenticated school (protected)
router.get('/getALL', authenticateToken, async (req, res) => {
  try {
    const teachers = await teacherQueries.getAllTeachers(db, req.user.id);
    res.json(teachers);
  } catch (error) {
    console.error('Fetch all teachers error:', error);
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
    console.error(`Fetch teacher id=${req.params.id} error:`, error);
    res.status(500).json({ error: 'Error fetching teacher', details: error.message });
  }
});

// Update teacher (protected)
router.put('/update/:id', authenticateToken, async (req, res) => {
  try {
    const affectedRows = await teacherQueries.updateTeacher(db, req.params.id, req.body, req.user.id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found or not in your school' });
    }
    res.json({ message: 'Teacher updated successfully' });
  } catch (error) {
    console.error(`Update teacher id=${req.params.id} error:`, error);
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
    console.error(`Delete teacher id=${req.params.id} error:`, error);
    res.status(500).json({ error: 'Error deleting teacher', details: error.message });
  }
});

// File upload endpoint (protected)
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: './Uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });
// const upload = multer({ storage });

// router.post('/upload', authenticateToken, upload.single('profilePic'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//     const fileUrl = `/Uploads/${req.file.filename}`;
//     res.json({ profile_pic_url: fileUrl });
//   } catch (error) {
//     console.error('File upload error:', error);
//     res.status(500).json({ error: 'Error uploading file', details: error.message });
//   }
// });

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
    const token = jwt.sign(
      { id: teacher.id, email: teacher.email, role: teacher.role, school_id: teacher.school_id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', token, teacher: { id: teacher.id, email: teacher.email, role: teacher.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error during login', details: error.message });
  }
});

module.exports = router;