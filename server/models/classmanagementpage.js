const db = require('../config/db');

class ClassManagement {
    static async createClass(classData) {
        const { class_name, section, class_teacher_id, school_id } = classData;
        const [result] = await db.execute(
            'INSERT INTO classes (class_name, section, class_teacher_id, school_id) VALUES (?, ?, ?, ?)',
            [class_name, section, class_teacher_id, school_id]
        );
        return { id: result.insertId, ...classData };
    }

    static async getAllClasses(school_id) {
        const [rows] = await db.execute(
            'SELECT c.*, t.name as teacher_name FROM classes c LEFT JOIN teachers t ON c.class_teacher_id = t.id WHERE c.school_id = ?',
            [school_id]
        );
        return rows;
    }

    static async getClassById(id, school_id) {
        const [rows] = await db.execute(
            'SELECT c.*, t.name as teacher_name FROM classes c LEFT JOIN teachers t ON c.class_teacher_id = t.id WHERE c.id = ? AND c.school_id = ?',
            [id, school_id]
        );
        return rows[0];
    }

    static async updateClass(id, classData, school_id) {
        const { class_name, section, class_teacher_id } = classData;
        const [result] = await db.execute(
            'UPDATE classes SET class_name = ?, section = ?, class_teacher_id = ? WHERE id = ? AND school_id = ?',
            [class_name, section, class_teacher_id, id, school_id]
        );
        return result.affectedRows > 0;
    }

    static async deleteClass(id, school_id) {
        const [result] = await db.execute('DELETE FROM classes WHERE id = ? AND school_id = ?', [id, school_id]);
        return result.affectedRows > 0;
    }
}

module.exports = ClassManagement;