const bcrypt = require('bcrypt');
const saltRounds = 10;

const teacherQueries = {
  // Create a new teacher
  async createTeacher(db, teacherData, school_id) {
    const {
      name, email, password, phone, gender, dob, address, qualification,
      experience_years, subject_specialty, class_assigned,
      profile_pic_url, joining_date, salary, role
    } = teacherData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `
      INSERT INTO teacher (
        name, email, password, phone, gender, dob, address, qualification,
        experience_years, subject_specialty, class_assigned, school_id,
        profile_pic_url, joining_date, salary, role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name, email, hashedPassword, phone, gender, dob, address, qualification,
      experience_years, subject_specialty, class_assigned, school_id,
      profile_pic_url, joining_date, salary, role
    ];
    const [result] = await db.query(query, values);
    return result.insertId;
  },

  // Get all teachers for a specific school
  async getAllTeachers(db, school_id) {
    const query = `
      SELECT id, name, email, phone, gender, dob, address, qualification,
             experience_years, subject_specialty, class_assigned, school_id,
             profile_pic_url, joining_date, salary, role, is_active,
             last_login, created_at, updated_at
      FROM teacher
      WHERE school_id = ? 
    `;
    const [rows] = await db.query(query, [school_id]);
    return rows;
  },

  // Get teacher by ID for a specific school
  async getTeacherById(db, id, school_id) {
    const query = `
      SELECT id, name, email, phone, gender, dob, address, qualification,
             experience_years, subject_specialty, class_assigned, school_id,
             profile_pic_url, joining_date, salary, role, is_active,
             last_login, created_at, updated_at
      FROM teacher
      WHERE id = ? AND school_id = ?
    `;
    const [rows] = await db.query(query, [id, school_id]);
    return rows[0];
  },

  // Update teacher
  async updateTeacher(db, id, teacherData, school_id) {
    const {
      name, email, phone, gender, dob, address, qualification,
      experience_years, subject_specialty, class_assigned,
      profile_pic_url, joining_date, salary, role
    } = teacherData;
    const query = `
      UPDATE teacher
      SET name = ?, email = ?, phone = ?, gender = ?, dob = ?,
          address = ?, qualification = ?, experience_years = ?,
          subject_specialty = ?, class_assigned = ?, 
          profile_pic_url = ?, joining_date = ?, salary = ?, role = ?
      WHERE id = ? AND school_id = ? 
    `;
    const values = [
      name, email, phone, gender, dob, address, qualification,
      experience_years, subject_specialty, class_assigned,
      profile_pic_url, joining_date, salary, role, id, school_id
    ];
    const [result] = await db.query(query, values);
    return result.affectedRows;
  },

  // Delete teacher (soft delete)
  async deleteTeacher(db, id, school_id) {
    const query = `
      Delete from teacher
      WHERE id = ? AND school_id = ? 
    `;
    const [result] = await db.query(query, [id, school_id]);
    return result.affectedRows;
  },

  // Authenticate teacher
  async authenticateTeacher(db, email, password) {
    const query = `
      SELECT id, email, password, role, school_id
      FROM teacher
      WHERE email = ? AND is_active = true
    `;
    const [rows] = await db.query(query, [email]);
    if (rows.length === 0) return null;
    const teacher = rows[0];
    const match = await bcrypt.compare(password, teacher.password);
    if (!match) return null;
    await db.query('UPDATE teacher SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [teacher.id]);
    return { id: teacher.id, email: teacher.email, role: teacher.role, school_id: teacher.school_id };
  }
};

module.exports = teacherQueries;