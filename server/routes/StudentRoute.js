const express = require("express");
const router = express.Router();
const studentModel = require("../models/Student");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const result = await studentModel.createStudent(req.body, school_id);
    res.status(201).json({ result, msg: "Student added successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getallstudents", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const students = await studentModel.getAllStudents(school_id);
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getstudent/:id", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const student = await studentModel.getStudentById(req.params.id, school_id);
    res.json(student);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.put("/updatestudent/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const school_id = req.user.id;
    const data = req.body;
    const result = await studentModel.updateStudent(id, school_id, data);
    res.json({ msg: "Updated successfully!", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/deletestudent/:id", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const result = await studentModel.deleteStudent(req.params.id, school_id);
    res.json({ msg: "Deleted Successfully", result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;