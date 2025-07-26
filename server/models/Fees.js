const db = require("../database/db");
const {logFeeHistory} = require("./FeesHistory")
async function createFee(data) {
  const {
    student_id, school_id, fee_type, amount_paid,
    payment_date, month_for, academic_year,
    payment_mode, receipt_no, remarks
  } = data;

  const [result] = await db.execute(
    `INSERT INTO fee_payments (
      student_id, school_id, fee_type, amount_paid,
      payment_date, month_for, academic_year,
      payment_mode, receipt_no, remarks,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      student_id, school_id, fee_type, amount_paid,
      payment_date, month_for, academic_year,
      payment_mode, receipt_no, remarks
    ]
  );

    await logFeeHistory(data);


  return result;
}

async function getAllFees() {
  const [rows] = await db.execute("SELECT * FROM fee_payments");
  return rows;
}

async function getFeeById(id) {
  const [rows] = await db.execute("SELECT * FROM fee_payments WHERE id = ?", [id]);
  return rows[0];
}

async function updateFee(id, data) {
  const {
    student_id, school_id, fee_type, amount_paid,
    payment_date, month_for, academic_year,
    payment_mode, receipt_no, remarks
  } = data;

  const [result] = await db.execute(
    `UPDATE fee_payments SET
      student_id=?, school_id=?, fee_type=?, amount_paid=?,
      payment_date=?, month_for=?, academic_year=?,
      payment_mode=?, receipt_no=?, remarks=?, updated_at=NOW()
    WHERE id=?`,
    [
      student_id, school_id, fee_type, amount_paid,
      payment_date, month_for, academic_year,
      payment_mode, receipt_no, remarks, id
    ]
  );

  return result;
}

async function deleteFee(id) {
  const [result] = await db.execute("DELETE FROM fee_payments WHERE id = ?", [id]);
  return result;
}

module.exports = {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
};
