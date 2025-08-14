const express = require('express');
const router = express.Router();
const studentModel = require('../../models/student/student');
const studentAuth = require('../../middleware/student/authmiddleware');


router.get('/getstudent/:id', studentAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.getStudentById(id);
    res.json({ success: true, message: 'Student retrieved successfully', data: student });
  } catch (err) {
    console.error('Error fetching student:', err.message);
    if (err.message === 'Student not found') {
      return res.status(404).json({ success: false, message: `No student with ID ${req.params.id} found`, error: err.message });
    }
    res.status(500).json({ success: false, message: 'Failed to retrieve student', error: err.message });
  }
});

// Update student's password
router.put('/update-password/:id', studentAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { newPassword } = req.body;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be a string with at least 6 characters' });
    }

    // Optional: ensure the requesting student can only update their own password
    if (req.user && req.user.id && String(req.user.id) !== String(id)) {
      return res.status(403).json({ success: false, message: 'Forbidden: cannot update another student\'s password' });
    }

    const result = await studentModel.updatePassword(id, null, newPassword);
    res.json({ success: true, message: 'Password updated successfully', data: result });
  } catch (err) {
    console.error('Error updating password:', err.message);
    if (err.message === 'Student not found') {
      return res.status(404).json({ success: false, message: `No student with ID ${req.params.id} found`, error: err.message });
    }
    res.status(500).json({ success: false, message: 'Failed to update password', error: err.message });
  }
});

module.exports = router;
