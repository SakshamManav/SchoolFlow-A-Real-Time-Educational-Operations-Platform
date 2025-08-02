"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:5001/student";

const StudentPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // <-- Edit mode state

  // Form state for adding/updating student
  const [newStudent, setNewStudent] = useState({
    student_id: "",
    student_name: "",
    class: "",
    section: "",
    father_name: "",
    mother_name: "",
    dob: "",
    gender: "",
    contact_no: "",
    admission_year: "",
    prev_school_name: "",
    address: "",
    national_id: "",
    email: "",
    stud_pic_url: "",
  });

  const router = useRouter();

  // Fetch all students on mount
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getallstudents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setAllStudents(data || []);
    } catch (err) {
      alert("Failed to fetch students");
    }
    setLoading(false);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // When viewing a student, show all fields including school_id
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
  };

  // On update, open the form with current info
  const handleUpdate = (id) => {
    const student = allStudents.find((s) => s.id === id);
    if (student) {
      setNewStudent(student);
      setIsEditMode(true);
      setShowAddForm(true);
      setShowPopup(false);
    }
  };

  const handleAddStudent = () => {
    setNewStudent({
      student_id: "",
      student_name: "",
      class: "",
      section: "",
      father_name: "",
      mother_name: "",
      dob: "",
      gender: "",
      contact_no: "",
      admission_year: "",
      prev_school_name: "",
      address: "",
      national_id: "",
      email: "",
      stud_pic_url: "",
    });
    setIsEditMode(false);
    setShowAddForm(true);
  };

  // On delete, call API and refresh
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await fetch(
          `http://localhost:5001/student/deletestudent/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to delete student");
        }
        alert("Student deleted successfully!");
        fetchStudents();
        handleClosePopup();
      } catch (err) {
        alert(err.message || "Failed to delete student");
      }
    }
  };

  // Explicit function for adding a student
  const addStudent = async (studentData) => {
    const res = await fetch("http://localhost:5001/student/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) throw new Error("Failed to add student");
    return res.json();
  };

  // Explicit function for updating a student
  const updateStudent = async (id, studentData) => {
    const res = await fetch(
      `http://localhost:5001/student/updatestudent/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(studentData),
      }
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update student");
    }
    return res.json();
  };

  // On form submit, call the explicit function
  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateStudent(newStudent.id, newStudent);
        alert("Student updated successfully!");
      } else {
        await addStudent(newStudent);
        alert("Student added successfully!");
      }
      fetchStudents();
      handleCloseAddForm();
    } catch (err) {
      alert(err.message || "Failed to submit student");
    }
  };

  // Classes from backend data
  const classes = Array.from(
    new Set(allStudents.map((s) => s.class).filter(Boolean))
  ).sort();

  const studentsToShow = selectedClass
    ? allStudents.filter((s) => s.class === selectedClass)
    : [];

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

            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : studentsToShow.length > 0 ? (
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
                        Father's Name
                      </th>{" "}
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DOB
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
                          {student.student_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.student_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.father_name}
                        </td>{" "}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.contact_no || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                            {student.class}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.dob
                            ? new Date(student.dob).toLocaleDateString("en-IN")
                            : "-"}
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

      {/* Add/Update Student Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50 text-black">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  {isEditMode ? "Update Student" : "Add New Student"}
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
            <form className="p-6" onSubmit={handleSubmitStudent}>
              {isEditMode && (
                <input type="hidden" name="id" value={newStudent.id || ""} />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    name="student_id"
                    value={newStudent.student_id}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter student ID"
                  />
                </div>
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="student_name"
                    value={newStudent.student_name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter student name"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <input
                    type="text"
                    name="class"
                    value={newStudent.class}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Class"
                  />
                </div>

                {/* Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section
                  </label>
                  <input
                    type="text"
                    name="section"
                    value={newStudent.section}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Section"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    value={newStudent.father_name}
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
                    name="mother_name"
                    value={newStudent.mother_name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter mother's name"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={newStudent.dob ? newStudent.dob.slice(0, 10) : ""}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Contact No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact_no"
                    value={newStudent.contact_no}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>

                {/* Admission Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admission Year
                  </label>
                  <input
                    type="text"
                    name="admission_year"
                    value={newStudent.admission_year}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="YYYY"
                  />
                </div>

                {/* Previous School Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous School Name
                  </label>
                  <input
                    type="text"
                    name="prev_school_name"
                    value={newStudent.prev_school_name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Previous School"
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

                {/* National ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    National ID (Aadhar) *
                  </label>
                  <input
                    type="text"
                    name="national_id"
                    value={newStudent.national_id}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1234-5678-9012"
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

                {/* Student Picture URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Picture URL
                  </label>
                  <input
                    type="text"
                    name="stud_pic_url"
                    value={newStudent.stud_pic_url}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com/photo.jpg"
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
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isEditMode ? "Update Student" : "Add Student"}
                </button>
              </div>
            </form>
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
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Student ID
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedStudent.student_id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      School ID
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedStudent.school_id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedStudent.student_name}
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
                      {selectedStudent.father_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Mother's Name
                    </label>
                    <p className="text-lg text-gray-900">
                      {selectedStudent.mother_name}
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
                      {selectedStudent.contact_no}
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
                      {selectedStudent.national_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => handleUpdate(selectedStudent.student_id)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Update
              </button>
              <button
                onClick={() => handleDelete(selectedStudent.student_id)}
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
