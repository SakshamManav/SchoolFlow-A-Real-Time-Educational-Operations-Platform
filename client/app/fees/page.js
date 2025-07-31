"use client"
import React, { use, useState, useEffect } from 'react';
import { CreditCard, Calendar, DollarSign, History, User, Hash, FileText } from 'lucide-react';
import { useRouter } from "next/navigation";

const FeesPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [formData, setFormData] = useState({
    month: '',
    submissionDate: '',
    amount: '',
    paidAmount: '',
    type: ''
  });
  const router = useRouter();
  // Sample data - in real app this would come from API
  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ];

  const allStudents = {
    'Class 1': [
      { id: 'STD001', name: 'Arjun Sharma', rollNo: '001' },
      { id: 'STD002', name: 'Sneha Patel', rollNo: '002' },
      { id: 'STD003', name: 'Ravi Kumar', rollNo: '003' }
    ],
    'Class 2': [
      { id: 'STD004', name: 'Rahul Kumar', rollNo: '004' },
      { id: 'STD005', name: 'Ananya Singh', rollNo: '005' },
      { id: 'STD006', name: 'Priya Gupta', rollNo: '006' }
    ],
    'Class 3': [
      { id: 'STD007', name: 'Dev Gupta', rollNo: '007' },
      { id: 'STD008', name: 'Kavya Mehta', rollNo: '008' }
    ]
  };

  // Dummy fee history data
  const feeHistory = {
    'STD001': [
      {
        id: 'FEE001',
        month: 'January 2025',
        submissionDate: '2025-01-15',
        amount: 5000,
        paidAmount: 5000,
        type: 'UPI',
        status: 'Paid'
      },
      {
        id: 'FEE002',
        month: 'February 2025',
        submissionDate: '2025-02-10',
        amount: 5000,
        paidAmount: 3000,
        type: 'Cash',
        status: 'Partial'
      },
      {
        id: 'FEE003',
        month: 'March 2025',
        submissionDate: '2025-03-05',
        amount: 5000,
        paidAmount: 5000,
        type: 'Card',
        status: 'Paid'
      }, 
      {
        id: 'FEE003',
        month: 'March 2025',
        submissionDate: '2025-03-05',
        amount: 5000,
        paidAmount: 5000,
        type: 'Card',
        status: 'Paid'
      }, 
    ],
    'STD004': [
      {
        id: 'FEE004',
        month: 'January 2025',
        submissionDate: '2025-01-20',
        amount: 5500,
        paidAmount: 5500,
        type: 'UPI',
        status: 'Paid'
      },
      {
        id: 'FEE005',
        month: 'February 2025',
        submissionDate: '2025-02-15',
        amount: 5500,
        paidAmount: 5500,
        type: 'Cash',
        status: 'Paid'
      }
    ],
    'STD007': [
      {
        id: 'FEE006',
        month: 'January 2025',
        submissionDate: '2025-01-12',
        amount: 6000,
        paidAmount: 4000,
        type: 'Card',
        status: 'Partial'
      }
    ]
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStudent('');
    setFormData({
      month: '',
      submissionDate: '',
      amount: '',
      paidAmount: '',
      type: ''
    });
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
    setFormData({
      month: '',
      submissionDate: new Date().toISOString().split('T')[0],
      amount: '',
      paidAmount: '',
      type: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.month || !formData.submissionDate || !formData.amount || !formData.paidAmount || !formData.type) {
      alert('Please fill all required fields');
      return;
    }
    
    // In real app, make API call to save fee record
    alert('Fee record submitted successfully!');
    
    // Reset form
    setFormData({
      month: '',
      submissionDate: new Date().toISOString().split('T')[0],
      amount: '',
      paidAmount: '',
      type: ''
    });
  };

  const studentsInClass = selectedClass ? allStudents[selectedClass] || [] : [];
  const currentStudent = studentsInClass.find(s => s.id === selectedStudent);
  const studentFeeHistory = selectedStudent ? feeHistory[selectedStudent] || [] : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const months = [
    'January 2025', 'February 2025', 'March 2025', 'April 2025', 'May 2025', 'June 2025',
    'July 2025', 'August 2025', 'September 2025', 'October 2025', 'November 2025', 'December 2025'
  ];
  useEffect(() => {
    if(!localStorage.getItem("token")){
      router.push("/login")
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
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
                  <option key={student.id} value={student.id}>
                    {student.name} (Roll: {student.rollNo})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Fee Submission Form */}
        {selectedStudent && currentStudent && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 ">
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
                        <p className="font-semibold text-gray-900">{currentStudent.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">Roll No:</span>
                        <p className="font-semibold text-gray-900">{currentStudent.rollNo}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fee Form */}
                <div className="space-y-6">
                  {/* Month Selection */}
                  <div>
                    <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                      Month *
                    </label>
                    <select
                      id="month"
                      name="month"
                      value={formData.month}
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

                  {/* Submission Date */}
                  <div>
                    <label htmlFor="submissionDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Submission Date *
                    </label>
                    <input
                      type="date"
                      id="submissionDate"
                      name="submissionDate"
                      value={formData.submissionDate}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {/* Amount Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Total Amount (₹) *
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleFormChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700 mb-2">
                        Paid Amount (₹) *
                      </label>
                      <input
                        type="number"
                        id="paidAmount"
                        name="paidAmount"
                        value={formData.paidAmount}
                        onChange={handleFormChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  {/* Payment Type */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select payment type...</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-5 h-5" />
                    Submit Fee Record
                  </button>
                </div>
              </div>
            </div>

            {/* Fee History */}
            <div className="bg-white rounded-xl shadow-lg overflow-y-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Fee History
                </h2>
              </div>
              
              <div className="p-6">
                {studentFeeHistory.length > 0 ? (
                  <div className="space-y-4">
                    {studentFeeHistory.map((record) => (
                      <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{record.month}</h4>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(record.submissionDate).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Total Amount:</span>
                            <p className="font-semibold text-gray-900">₹{record.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Paid Amount:</span>
                            <p className="font-semibold text-gray-900">₹{record.paidAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Payment Type:</span>
                            <p className="font-semibold text-gray-900">{record.type}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Balance:</span>
                            <p className={`font-semibold ${record.amount - record.paidAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              ₹{(record.amount - record.paidAmount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
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