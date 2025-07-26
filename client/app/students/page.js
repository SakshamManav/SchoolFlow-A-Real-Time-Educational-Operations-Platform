"use client";
import React, { useState } from "react";
import {
  Eye,
  X,
  Edit,
  Trash2,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Plus,
} from "lucide-react";

const StudentPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form state for adding new student
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    fatherName: "",
    motherName: "",
    class: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    aadharNo: "",
  });

  // Sample data - in real app this would come from API
  const classes = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];

  const [allStudents, setAllStudents] = useState({
    "Class 1": [
      {
        id: "STD001",
        name: "Arjun Sharma",
        rollNo: "001",
        fatherName: "Rajesh Sharma",
        class: "Class 1",
        dob: "2017-05-15",
        motherName: "Priya Sharma",
        phone: "+91 9876543210",
        email: "arjun.sharma@email.com",
        address: "123 Main Street, Delhi",
        aadharNo: "1234-5678-9012",
      },
      {
        id: "STD002",
        name: "Sneha Patel",
        rollNo: "002",
        fatherName: "Amit Patel",
        class: "Class 1",
        dob: "2017-08-22",
        motherName: "Meera Patel",
        phone: "+91 9876543211",
        email: "sneha.patel@email.com",
        address: "456 Garden Road, Mumbai",
        aadharNo: "1234-5678-9013",
      },
    ],
    "Class 2": [
      {
        id: "STD003",
        name: "Rahul Kumar",
        rollNo: "003",
        fatherName: "Suresh Kumar",
        class: "Class 2",
        dob: "2016-03-10",
        motherName: "Sunita Kumar",
        phone: "+91 9876543212",
        email: "rahul.kumar@email.com",
        address: "789 Park Avenue, Bangalore",
        aadharNo: "1234-5678-9014",
      },
      {
        id: "STD004",
        name: "Ananya Singh",
        rollNo: "004",
        fatherName: "Vikram Singh",
        class: "Class 2",
        dob: "2016-07-18",
        motherName: "Kavita Singh",
        phone: "+91 9876543213",
        email: "ananya.singh@email.com",
        address: "321 Hill View, Pune",
        aadharNo: "1234-5678-9015",
      },
    ],
    "Class 3": [
      {
        id: "STD005",
        name: "Dev Gupta",
        rollNo: "005",
        fatherName: "Manoj Gupta",
        class: "Class 3",
        dob: "2015-11-05",
        motherName: "Ritu Gupta",
        phone: "+91 9876543214",
        email: "dev.gupta@email.com",
        address: "654 Lake Side, Chennai",
        aadharNo: "1234-5678-9016",
      },
    ],
  });

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
  };

  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      // In real app, make API call to delete
      alert(`Student ${studentId} would be deleted`);
      handleClosePopup();
    }
  };

  const handleUpdate = (studentId) => {
    alert(`Update form for student ${studentId} would open`);
    // In real app, open update form or navigate to edit page
  };

  const handleAddStudent = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setNewStudent({
      name: "",
      rollNo: "",
      fatherName: "",
      motherName: "",
      class: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
      aadharNo: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitStudent = (e) => {
    e.preventDefault();

    // Generate new student ID
    const existingStudents = Object.values(allStudents).flat();
    const maxId = existingStudents.reduce((max, student) => {
      const num = parseInt(student.id.replace("STD", ""));
      return num > max ? num : max;
    }, 0);
    const newId = `STD${String(maxId + 1).padStart(3, "0")}`;

    // Create new student object
    const studentToAdd = {
      ...newStudent,
      id: newId,
    };

    // Add to the appropriate class
    setAllStudents((prev) => ({
      ...prev,
      [newStudent.class]: prev[newStudent.class]
        ? [...prev[newStudent.class], studentToAdd]
        : [studentToAdd],
    }));

    alert(`Student ${studentToAdd.name} has been added successfully!`);
    handleCloseAddForm();
  };

  const studentsToShow = selectedClass ? allStudents[selectedClass] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Student Management
              </h1>
            </div>
            <button
              onClick={handleAddStudent}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Student
            </button>
          </div>

          {/* Class Selection Dropdown */}
          <div className="max-w-md">
            <label
              htmlFor="class-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Class
            </label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
            >
              <option value="">Choose a class...</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Table */}
        {selectedClass && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Students in {selectedClass} ({studentsToShow.length} students)
              </h2>
            </div>

            {studentsToShow.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Father's Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentsToShow.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.fatherName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                            {student.class}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(student.dob).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handleViewStudent(student)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No students found in {selectedClass}
                </p>
              </div>
            )}
          </div>
        )}

        {!selectedClass && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Select a Class
            </h3>
            <p className="text-gray-500">
              Choose a class from the dropdown above to view students
            </p>
          </div>
        )}
      </div>

      {/* Add Student Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50 text-black">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Add New Student
                </h3>
                <button
                  onClick={handleCloseAddForm}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newStudent.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    name="rollNo"
                    value={newStudent.rollNo}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter roll number"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={newStudent.fatherName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter father's name"
                  />
                </div>

                {/* Mother's Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={newStudent.motherName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter mother's name"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <select
                    name="class"
                    value={newStudent.class}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={newStudent.dob}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newStudent.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="student@email.com"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={newStudent.address}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter complete address"
                  />
                </div>

                {/* Aadhar Number */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number *
                  </label>
                  <input
                    type="text"
                    name="aadharNo"
                    value={newStudent.aadharNo}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1234-5678-9012"
                  />
                </div>
              </div>

              {/* Form Footer */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseAddForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitStudent}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Student Popup Modal */}
      {showPopup && selectedStudent && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4 z-50">
          <div className="max-h-[80%] bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Student Details
                </h3>
                <button
                  onClick={handleClosePopup}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Student ID
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedStudent.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedStudent.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Roll Number
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.rollNo}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Class
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.class}
                    </p>
                  </div>
                </div>

                {/* Family Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Father's Name
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.fatherName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Mother's Name
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.motherName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Date of Birth
                      </label>
                      <p className="text-lg text-gray-900">
                        {new Date(selectedStudent.dob).toLocaleDateString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Additional Info */}
              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email ID
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Address
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Aadhar Number
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.aadharNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => handleUpdate(selectedStudent.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Update
              </button>
              <button
                onClick={() => handleDelete(selectedStudent.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
