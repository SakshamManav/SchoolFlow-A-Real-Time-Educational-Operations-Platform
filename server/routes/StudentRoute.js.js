const express = require("express");
const router = express.Router();
const studentModel = require("../models/Student");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const result = await studentModel.createStudent(req.body, school_id);
    res.status(201).json({ result, msg: "NEW student added successfully!!" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/getallstudents", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const students = await studentModel.getAllStudents(school_id);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/getstudent/:id", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const student = await studentModel.getStudentById(req.params.id, school_id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/updatestudent/:id", authenticateToken, async (req, res) => {
  try {
    const student_id = req.params.id;
    const school_id = req.user.id; // pulled from the JWT token
    const data = req.body;

    if (!school_id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: School ID not found in token" });
    }

    const result = await studentModel.updateStudent(
      student_id,
      school_id,
      data
    );
    res.json({res: result, msg:"Updated SuccessFully!!"});
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/deletestudent/:id", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const result = await studentModel.deleteStudent(req.params.id, school_id);

    res.json({ res: result, msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
