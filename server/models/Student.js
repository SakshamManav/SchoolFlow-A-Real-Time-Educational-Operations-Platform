const db = require("../database/db");

async function createStudent(data, school_id) {
  try {
    const {
      student_id, student_name, class: cls, section, father_name, mother_name, dob, gender,
      contact_no, admission_year, prev_school_name, address, national_id, email, stud_pic_url
    } = data;

    if (!student_name || !cls || !father_name || !mother_name || !dob || !address || !national_id || !email) {
      throw new Error("Missing required fields");
    }

    const [result] = await db.execute(
      `INSERT INTO student (
        student_id, student_name, class, section, father_name, mother_name, dob,
        gender, contact_no, admission_year, prev_school_name, address,
        school_id, national_id, email, stud_pic_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_id, student_name, cls, section, father_name, mother_name, dob,
        gender, contact_no, admission_year, prev_school_name, address,
        school_id, national_id, email, stud_pic_url
      ]
    );

    return result;
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function getAllStudents(school_id) {
  try {
    const [rows] = await db.execute("SELECT * FROM student WHERE school_id = ?", [school_id]);
    return rows;
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function getStudentById(id, school_id) {
  try {
    const [rows] = await db.execute("SELECT * FROM student WHERE id = ? AND school_id = ?", [id, school_id]);
    if (rows.length === 0) throw new Error("Student not found");
    return rows[0];
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function updateStudent(id, school_id, data) {
  try {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== "id" && key !== "school_id") {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) throw new Error("No fields to update");

    const query = `UPDATE student SET ${fields.join(", ")} WHERE id = ? AND school_id = ?`;
    values.push(id, school_id);

    const [result] = await db.execute(query, values);
    if (result.affectedRows === 0) throw new Error("Student not found or no changes made");
    return result;
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function deleteStudent(id, school_id) {
  try {
    const [result] = await db.execute("DELETE FROM student WHERE id = ? and school_id = ?", [id, school_id]);
    if (result.affectedRows === 0) throw new Error("Student not found");
    return result;
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
