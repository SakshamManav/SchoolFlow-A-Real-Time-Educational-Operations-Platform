const express = require("express");
const router = express.Router();
const studentModel = require("../models/Student");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const result = await studentModel.createStudent(req.body, school_id);
    res.status(201).json({ result, message: "NEW student added successfully!!" });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong",
    });
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

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
        message: `No student with ID ${req.params.id} found for this school.`,
      });
    }

    res.json(student);
  } catch (err) {
    console.log(err)
    console.error("Error fetching student:", err);
    res.status(500).json({ message:err.message || "Something went wrong",  });
  }
});

router.put("/updatestudent/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id; // primary key
    const school_id = req.user.id; // from JWT
    const data = req.body;

    const result = await studentModel.updateStudent(id, school_id, data);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          message: "No matching student found or data was already up to date.",
        });
    }

    return res.json({ message: "Updated successfully!", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message:err.message || "Something went wrong", });
  }
});

router.delete("/deletestudent/:id", authenticateToken, async (req, res) => {
  try {
    const school_id = req.user.id;
    const result = await studentModel.deleteStudent(req.params.id, school_id);

    res.json({ res: result, message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message:err.message || "Something went wrong", });
  }
});

module.exports = router;
