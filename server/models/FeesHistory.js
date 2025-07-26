const db = require("../database/db");

async function logFeeHistory(data) {
  const {
    student_id, school_id, fee_type, amount_paid,
    payment_date, month_for, academic_year,
    payment_mode, receipt_no, remarks
  } = data;

  const [result] = await db.execute(
    `INSERT INTO fee_payments_history (
      student_id, school_id, fee_type, amount_paid,
      payment_date, month_for, academic_year,
      payment_mode, receipt_no, remarks,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      student_id, school_id, fee_type, amount_paid,
      payment_date, month_for, academic_year,
      payment_mode, receipt_no, remarks
    ]
  );

  return result;
}

module.exports = {
  logFeeHistory
};
