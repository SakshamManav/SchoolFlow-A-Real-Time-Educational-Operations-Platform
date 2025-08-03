"use client";
import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, DollarSign, History, User, Hash, FileText, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";

const FeesPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [formData, setFormData] = useState({
    month_for: '',
    payment_date: '',
    total_amount: '',
    amount_paid: '',
    fee_type: '',
    payment_mode: '',
    academic_year: '2025-2026',
    receipt_no: '',
    remarks: '',
    due_date: '',
    discount: 0,
    fine: 0,
  });
  const [classes, setClasses] = useState([
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ]);
  const [allStudents, setAllStudents] = useState([]);
  const [feeHistory, setFeeHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const STUDENT_API_BASE_URL = 'http://localhost:5001/student';
  const FEES_API_BASE_URL = 'http://localhost:5001/fees';

  // Check authentication on mount
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
  }, [router]);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`${STUDENT_API_BASE_URL}/getallstudents`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Students response:', data);
        setAllStudents(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error('Fetch students error:', err);
        setError('Error fetching students: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Fetch fee history when student is selected
  useEffect(() => {
    if (!selectedStudent) {
      setFeeHistory([]);
      return;
    }

    const fetchFeeHistory = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`${FEES_API_BASE_URL}/getfees/${selectedStudent}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log('Fee history response:', data);
        if (!data.success) throw new Error(data.message || 'Failed to fetch fee history');
        setFeeHistory(data.data || []);
      } catch (err) {
        console.error('Fetch fee history error:', err);
        setError('Error fetching fee history: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeHistory();
  }, [selectedStudent]);

  // Log selectedClass, studentsInClass, and currentStudent for debugging
  useEffect(() => {
    console.log('Selected class:', selectedClass);
    console.log('studentsInClass:', studentsInClass);
    console.log('Selected student:', selectedStudent);
    console.log('Current student:', currentStudent);
  }, [selectedClass, selectedStudent]);

  const handleClassChange = (e) => {
    const newClass = e.target.value;
    console.log('Class changed to:', newClass);
    setSelectedClass(newClass);
    setSelectedStudent('');
    setFormData({
      month_for: '',
      payment_date: new Date().toISOString().split('T')[0],
      total_amount: '',
      amount_paid: '',
      fee_type: '',
      payment_mode: '',
      academic_year: '2025-2026',
      receipt_no: '',
      remarks: '',
      due_date: '',
      discount: 0,
      fine: 0,
    });
    setFeeHistory([]);
  };

  const handleStudentChange = (e) => {
    const newStudent = e.target.value;
    console.log('Student changed to:', newStudent);
    setSelectedStudent(newStudent);
    setFormData({
      month_for: '',
      payment_date: new Date().toISOString().split('T')[0],
      total_amount: '',
      amount_paid: '',
      fee_type: '',
      payment_mode: '',
      academic_year: '2025-2026',
      receipt_no: '',
      remarks: '',
      due_date: '',
      discount: 0,
      fine: 0,
    });
  };

  const handleFormChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.month_for || !formData.payment_date || !formData.total_amount || !formData.amount_paid || !formData.fee_type || !formData.payment_mode ) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${FEES_API_BASE_URL}/createfees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          student_id: selectedStudent,
          fee_type: formData.fee_type,
          month_for: formData.month_for,
          academic_year: formData.academic_year,
          total_amount: parseFloat(formData.total_amount),
          amount_paid: parseFloat(formData.amount_paid),
          due_date: formData.due_date || formData.payment_date,
          payment_date: formData.payment_date,
          payment_mode: formData.payment_mode,
          receipt_no: formData.receipt_no || `REC-${Date.now()}`,
          discount: parseFloat(formData.discount) || 0,
          fine: parseFloat(formData.fine) || 0,
          remarks: formData.remarks,
        }),
      });

      const data = await response.json();
      console.log('Create fee response:', data);
      if (!data.success) throw new Error(data.message || 'Failed to create fee');
      alert('Fee record submitted successfully!');
      
      // Refresh fee history
      const historyResponse = await fetch(`${FEES_API_BASE_URL}/getfees/${selectedStudent}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const historyData = await historyResponse.json();
      console.log('Refresh fee history response:', historyData);
      if (historyData.success) setFeeHistory(historyData.data || []);

      // Reset form
      setFormData({
        month_for: '',
        payment_date: new Date().toISOString().split('T')[0],
        total_amount: '',
        amount_paid: '',
        fee_type: '',
        payment_mode: '',
        academic_year: '2025-2026',
        receipt_no: '',
        remarks: '',
        due_date: '',
        discount: 0,
        fine: 0,
      });
    } catch (err) {
      console.error('Create fee error:', err);
      setError('Error submitting fee: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (feeId) => {
    if (!confirm('Are you sure you want to delete this fee record?')) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${FEES_API_BASE_URL}/deletefees/${feeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log('Delete fee response:', data);
      if (!data.success) throw new Error(data.message || 'Failed to delete fee');
      
      // Refresh fee history
      const historyResponse = await fetch(`${FEES_API_BASE_URL}/getfees/${selectedStudent}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const historyData = await historyResponse.json();
      console.log('Refresh fee history after delete response:', historyData);
      if (historyData.success) setFeeHistory(historyData.data || []);
      alert('Fee record deleted successfully!');
    } catch (err) {
      console.error('Delete fee error:', err);
      setError('Error deleting fee: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Map selected class (e.g., "Class 8") to numerical value (e.g., 8)
  const getClassNumber = (className) => {
    if (!className) return null;
    const match = className.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  // Filter students by selected class
  const studentsInClass = selectedClass
    ? allStudents.filter(student => {
        const classNumber = getClassNumber(selectedClass);
        const studentClass = parseInt(student.class, 10);
        console.log('Filtering student:', student, 'classNumber:', classNumber, 'studentClass:', studentClass);
        return studentClass === classNumber;
      })
    : [];

  const currentStudent = studentsInClass.find(s => s.id.toString() === selectedStudent);

  const getStatusColor = (amount, paidAmount) => {
    if (paidAmount >= amount) return 'bg-green-100 text-green-800';
    if (paidAmount > 0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusText = (amount, paidAmount) => {
    if (paidAmount >= amount) return 'Paid';
    if (paidAmount > 0) return 'Partial';
    return 'Pending';
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const feeTypes = ['Tuition', 'Transport', 'Lab', 'Admission', 'Other'];
  const paymentModes = ['Cash', 'Card', 'Online', 'UPI', 'Bank Transfer'];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4"
      suppressHydrationWarning={true}
    >
      <div className="max-w-7xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6">
            Loading...
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-800">Fees Management</h1>
          </div>
          
          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class Selection */}
            <div>
              <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={handleClassChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="">Choose a class...</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Student Selection */}
            <div>
              <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select
                id="student-select"
                value={selectedStudent}
                onChange={handleStudentChange}
                disabled={!selectedClass}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Choose a student...</option>
                {studentsInClass.map((student) => (
                  <option key={student.id} value={student.id.toString()}>
                    {student.student_name} (ID: {student.student_id})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Fee Submission Form */}
        {selectedStudent && currentStudent && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Fee Submission Form
                </h2>
              </div>
              
              <div className="p-6">
                {/* Student Info Display */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">Student ID:</span>
                        <p className="font-semibold text-gray-900">{currentStudent.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">Name:</span>
                        <p className="font-semibold text-gray-900">{currentStudent.student_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">Student ID:</span>
                        <p className="font-semibold text-gray-900">{currentStudent.student_id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fee Form */}
                <div className="space-y-6">
                  {/* Month Selection */}
                  <div>
                    <label htmlFor="month_for" className="block text-sm font-medium text-gray-700 mb-2">
                      Month *
                    </label>
                    <select
                      id="month_for"
                      name="month_for"
                      value={formData.month_for}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select month...</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fee Type */}
                  <div>
                    <label htmlFor="fee_type" className="block text-sm font-medium text-gray-700 mb-2">
                      Fee Type *
                    </label>
                    <select
                      id="fee_type"
                      name="fee_type"
                      value={formData.fee_type}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select fee type...</option>
                      {feeTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <label htmlFor="payment_mode" className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Mode *
                    </label>
                    <select
                      id="payment_mode"
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select payment mode...</option>
                      {paymentModes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>

                
                  {/* Submission Date */}
                  <div>
                    <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Submission Date *
                    </label>
                    <input
                      type="date"
                      id="payment_date"
                      name="payment_date"
                      value={formData.payment_date}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {/* Due Date */}
                  <div>
                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="due_date"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {/* Amount Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Total Amount (₹) *
                      </label>
                      <input
                        type="number"
                        id="total_amount"
                        name="total_amount"
                        value={formData.total_amount}
                        onChange={handleFormChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <label htmlFor="amount_paid" className="block text-sm font-medium text-gray-700 mb-2">
                        Paid Amount (₹) *
                      </label>
                      <input
                        type="number"
                        id="amount_paid"
                        name="amount_paid"
                        value={formData.amount_paid}
                        onChange={handleFormChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  {/* Discount and Fine */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                        Discount (₹)
                      </label>
                      <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleFormChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="fine" className="block text-sm font-medium text-gray-700 mb-2">
                        Fine (₹)
                      </label>
                      <input
                        type="number"
                        id="fine"
                        name="fine"
                        value={formData.fine}
                        onChange={handleFormChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Receipt Number */}
                  <div>
                    <label htmlFor="receipt_no" className="block text-sm font-medium text-gray-700 mb-2">
                      Receipt Number
                    </label>
                    <input
                      type="text"
                      id="receipt_no"
                      name="receipt_no"
                      value={formData.receipt_no}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="REC-XXXX"
                    />
                  </div>

                  {/* Remarks */}
                  <div>
                    <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks
                    </label>
                    <textarea
                      id="remarks"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows="4"
                      placeholder="Any additional notes..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-emerald-400 disabled:cursor-not-allowed"
                  >
                    <DollarSign className="w-5 h-5" />
                    Submit Fee Record
                  </button>
                </div>
              </div>
            </div>

            {/* Fee History */}
            <div className="bg-white rounded-xl shadow-lg overflow-y-auto max-h-[600px]">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Fee History
                </h2>
              </div>
              
              <div className="p-6">
                {feeHistory.length > 0 ? (
                  <div className="space-y-4">
                    {feeHistory.map((record) => {
                      // Calculate balance if not provided by backend
                      const balance = record.balance !== undefined ? record.balance : (record.total_amount - record.amount_paid);
                      return (
                        <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">{record.month_for}</h4>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(record.payment_date).toLocaleDateString('en-IN')}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.total_amount, record.amount_paid)}`}>
                                {getStatusText(record.total_amount, record.amount_paid)}
                              </span>
                              <button
                                onClick={() => handleDelete(record.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete Fee Record"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Fee Type:</span>
                              <p className="font-semibold text-gray-900">{record.fee_type}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Payment Mode:</span>
                              <p className="font-semibold text-gray-900">{record.payment_mode}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Total Amount:</span>
                              <p className="font-semibold text-gray-900">₹{record.total_amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Paid Amount:</span>
                              <p className="font-semibold text-gray-900">₹{record.amount_paid.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Balance:</span>
                              <p className={`font-semibold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                ₹{balance.toLocaleString()}
                              </p>
                            </div>
                            {record.discount > 0 && (
                              <div>
                                <span className="text-gray-600">Discount:</span>
                                <p className="font-semibold text-gray-900">₹{record.discount.toLocaleString()}</p>
                              </div>
                            )}
                            {record.fine > 0 && (
                              <div>
                                <span className="text-gray-600">Fine:</span>
                                <p className="font-semibold text-gray-900">₹{record.fine.toLocaleString()}</p>
                              </div>
                            )}
                            {record.receipt_no && (
                              <div>
                                <span className="text-gray-600">Receipt No:</span>
                                <p className="font-semibold text-gray-900">{record.receipt_no}</p>
                              </div>
                            )}
                            {record.remarks && (
                              <div className="col-span-2">
                                <span className="text-gray-600">Remarks:</span>
                                <p className="font-semibold text-gray-900">{record.remarks}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Fee History</h3>
                    <p className="text-gray-500">No fee records found for this student</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedStudent && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <CreditCard className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Select Student</h3>
            <p className="text-gray-500">Choose a class and student to manage fee records</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesPage;