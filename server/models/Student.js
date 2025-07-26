const db = require("../database/db");

async function createStudent(data) {
  const { student_id, student_name, class: cls, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, school_id, national_id, email, stud_pic_url } = data;
  const [result] = await db.execute(
    `INSERT INTO student (student_id, student_name, class, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, school_id, national_id, email, stud_pic_url, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [student_id, student_name, cls, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, school_id, national_id, email, stud_pic_url]
  );
  return result;
}

async function getAllStudents() {
  const [rows] = await db.execute("SELECT * FROM student");
  return rows;
}

async function getStudentById(id) {
  const [rows] = await db.execute("SELECT * FROM student WHERE id = ?", [id]);
  return rows[0];
}

async function updateStudent(id, data) {
  const { student_name, class: cls, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, school_id, national_id, email, stud_pic_url } = data;
  const [result] = await db.execute(
    `UPDATE student SET student_name=?, class=?, section=?, father_name=?, mother_name=?, dob=?, gender=?, contact_no=?, admission_year=?, prev_school_name=?, address=?, school_id=?, national_id=?, email=?, stud_pic_url=?, updated_at=NOW() WHERE id=?`,
    [student_name, cls, section, father_name, mother_name, dob, gender, contact_no, admission_year, prev_school_name, address, school_id, national_id, email, stud_pic_url, id]
  );
  return result;
}

async function deleteStudent(id) {
  const [result] = await db.execute("DELETE FROM student WHERE id = ?", [id]);
  return result;
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};