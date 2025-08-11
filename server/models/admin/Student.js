const db = require("../../database/db");

async function createStudent(data, school_id) {
  try {
    const {
      student_id, student_name, class: cls, section, father_name, mother_name, dob,
      gender, contact_no, admission_year, prev_school_name, address, national_id, email, stud_pic_url
    } = data;

    // Validate required fields
    const requiredFields = { student_name, class: cls, father_name, mother_name, dob, address, national_id, email };
    const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Validate DOB format (YYYY-MM-DD)
    if (dob && isNaN(Date.parse(dob))) {
      throw new Error("Invalid date format for DOB, use YYYY-MM-DD");
    }

    // Check for duplicate student_id and email
    if (student_id || email) {
      const [existing] = await db.execute(
        "SELECT student_id, email FROM student WHERE (student_id = ? OR email = ?) AND school_id = ?",
        [student_id, email, school_id]
      );
      
      if (existing.length > 0) {
        if (existing[0].student_id === student_id) {
          throw new Error("DUPLICATE_STUDENT_ID");
        }
        if (existing[0].email === email) {
          throw new Error("DUPLICATE_EMAIL");
        }
      }
    }

    const [result] = await db.execute(
      `INSERT INTO student (
        student_id, student_name, class, section, father_name, mother_name, dob,
        gender, contact_no, admission_year, prev_school_name, address,
        school_id, national_id, email, stud_pic_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_id || null, student_name, cls, section || null, father_name, mother_name, dob,
        gender || null, contact_no || null, admission_year || null, prev_school_name || null, address,
        school_id, national_id, email, stud_pic_url || null
      ]
    );

    return { id: result.insertId, ...data, school_id };
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error(`Duplicate student_id: ${data.student_id} is already in use`);
    }
    if (err.code === "ER_NO_REFERENCED_ROW" || err.code === "ER_ROW_IS_REFERENCED") {
      throw new Error("Invalid school_id or database constraint violation");
    }
    throw new Error(`Database error: ${err.message}`);
  }
}

async function getAllStudents(school_id) {
  try {
    const [rows] = await db.execute("SELECT * FROM student WHERE school_id = ?", [school_id]);
    return rows;
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
}

async function getStudentById(id, school_id) {
  try {
    const [rows] = await db.execute("SELECT * FROM student WHERE id = ? AND school_id = ?", [id, school_id]);
    if (rows.length === 0) {
      throw new Error("Student not found");
    }
    return rows[0];
  } catch (err) {
    throw new Error(err.message === "Student not found" ? err.message : `Database error: ${err.message}`);
  }
}

async function updateStudent(id, school_id, data) {
  try {
    // Validate email format if provided
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format");
      }
    }

    // Validate DOB format if provided
    if (data.dob && isNaN(Date.parse(data.dob))) {
      throw new Error("Invalid date format for DOB, use YYYY-MM-DD");
    }

    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== "id" && key !== "school_id") {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    const query = `UPDATE student SET ${fields.join(", ")} WHERE id = ? AND school_id = ?`;
    values.push(id, school_id);

    const [result] = await db.execute(query, values);
    if (result.affectedRows === 0) {
      throw new Error("Student not found");
    }
    return result;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error(`Duplicate student_id: ${data.student_id} is already in use`);
    }
    if (err.code === "ER_NO_REFERENCED_ROW" || err.code === "ER_ROW_IS_REFERENCED") {
      throw new Error("Invalid school_id or database constraint violation");
    }
    throw new Error(err.message);
  }
}

async function deleteStudent(id, school_id) {
  try {
    const [existingFees] = await db.execute(
      "SELECT 1 FROM fees WHERE student_id = ? AND school_id = ?",
      [id, school_id]
    );
    if (existingFees.length > 0) {
      throw new Error(`Cannot delete student with ID ${id} due to associated fee records`);
    }

    const [result] = await db.execute("DELETE FROM student WHERE id = ? AND school_id = ?", [id, school_id]);
    if (result.affectedRows === 0) {
      throw new Error("Student not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
