const db = require("../database/db");

async function createStudent(data, school_id) {
  const { student_id, student_name, class: cls, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, national_id, email, stud_pic_url } = data;
  const [result] = await db.execute(
    `INSERT INTO student (student_id, student_name, class, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, school_id, national_id, email, stud_pic_url, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [student_id, student_name, cls, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, school_id, national_id, email, stud_pic_url]
  );
  return result;
}

async function getAllStudents(school_id) {
  const [rows] = await db.execute("SELECT * FROM student where school_id = ?", [school_id]);
  return rows;
}

async function getStudentById(student_id, school_id) {
  const [rows] = await db.execute("SELECT * FROM student WHERE student_id = ? AND school_id = ?", [student_id, school_id]);
  return rows[0];
}


async function updateStudent(student_id, school_id, data) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }


  fields.push("updated_at = NOW()");

  const query = `UPDATE student SET ${fields.join(", ")} WHERE student_id = ? AND school_id = ?`;
  values.push(student_id, school_id);

  const [result] = await db.execute(query, values);
  return result;
}


async function deleteStudent(student_id, school_id) {
  const [result] = await db.execute("DELETE FROM student WHERE student_id = ? and school_id = ?", [student_id, school_id]);
  return result;
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};