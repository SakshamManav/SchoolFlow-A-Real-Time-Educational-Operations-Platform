const db = require("../database/db");
const { logFeeHistory } = require("./FeesHistory");

async function createFee(data, school_id) {
  const {
    student_id,
    fee_type,
    amount_paid,
    payment_date,
    month_for,
    academic_year,
    payment_mode,
    receipt_no,
    remarks,
    total_amount,
    due_date,
    discount,
    fine
  } = data;

  const [result] = await db.execute(
    `INSERT INTO fees (
      student_id, school_id, fee_type, amount_paid,
      payment_date, month_for, academic_year,
      payment_mode, receipt_no, remarks,
      total_amount, due_date, discount, fine
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      student_id,
      school_id,
      fee_type || null,
      amount_paid  || null,
      payment_date || null,
      month_for || null,
      academic_year || null,
      payment_mode || null,
      receipt_no || null,
      remarks || null,
      total_amount,
      due_date || null,
      discount || null,
      fine || null
    ]
  );

  // await logFeeHistory(data);
  return result;
}

async function getAllFees() {
  const [rows] = await db.execute("SELECT * FROM fee_payments");
  return rows;
}
// by student and school_id

async function getFeeById(id, school_id) {
  const [rows] = await db.execute("SELECT * FROM fee_payments WHERE student_id = ? and school_id = ?", [id, school_id]);
  return rows;
}

async function updateFee(id, data) {
  const {
    student_id,
    school_id,
    fee_type,
    amount_paid,
    payment_date,
    month_for,
    academic_year,
    payment_mode,
    receipt_no,
    remarks,
    total_amount,
    due_date,
    discount,
    fine
  } = data;

  const [result] = await db.execute(
    `UPDATE fee_payments SET
      student_id=?, school_id=?, fee_type=?, amount_paid=?,
      payment_date=?, month_for=?, academic_year=?,
      payment_mode=?, receipt_no=?, remarks=?,
      total_amount=?, due_date=?, discount=?, fine=?
    WHERE id=?`,
    [
      student_id,
      school_id,
      fee_type,
      amount_paid,
      payment_date,
      month_for,
      academic_year,
      payment_mode,
      receipt_no,
      remarks,
      total_amount,
      due_date,
      discount,
      fine,
      id
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
