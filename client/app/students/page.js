"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";

const API_BASE = "http://localhost:5001/student";

const initialStudent = {
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
};

const StudentPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState(initialStudent);
  const [updateForm, setUpdateForm] = useState(initialStudent);

  const router = useRouter();

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

  // Add Student Handlers
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setAddForm(initialStudent);
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setAddForm(initialStudent);
  };

  const addStudent = async (studentData) => {
    const res = await fetch(`${API_BASE}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to add student");
    }
    return res.json();
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(addForm);
      alert("Student added successfully!");
      fetchStudents();
      closeAddForm();
    } catch (err) {
      alert(err.message || "Failed to add student");
    }
  };

  // Update Student Handlers
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  const openUpdateForm = (student) => {
    setUpdateForm(student);
    setShowUpdateForm(true);
    setShowPopup(false);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setUpdateForm(initialStudent);
  };

  const updateStudent = async (id, studentData) => {
    const res = await fetch(`${API_BASE}/updatestudent/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update student");
    }
    return res.json();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(updateForm);
    const updatedData = { ...updateForm };

    if (updatedData.dob) {
      updatedData.dob = new Date(updatedData.dob).toISOString().slice(0, 10);
    }
    delete updatedData.created_at;
    delete updatedData.updated_at;

    try {
      await updateStudent(updatedData.id, updatedData);
      alert("Student updated successfully!");
      fetchStudents();
      closeUpdateForm();
    } catch (err) {
      alert(err.message || "Failed to update student");
    }
  };

  // Delete Student
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await fetch(`${API_BASE}/deletestudent/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to delete student");
        }
        alert("Student deleted successfully!");
        fetchStudents();
        setShowPopup(false);
      } catch (err) {
        alert(err.message || "Failed to delete student");
      }
    }
  };

  // View Student
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
  };

  // Class dropdown
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
              onClick={openAddForm}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Student
            </button>
          </div>
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
              onChange={(e) => setSelectedClass(e.target.value)}
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
              <div className="overflow-x-auto text-black">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Student ID</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Father's Name</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Class</th>
                      <th className="px-6 py-4">DOB</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 pl-2">
                    {studentsToShow.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 text-center">{student.id}</td>
                        <td className="px-6 py-4 text-center">
                          {student.student_id}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {student.student_name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {student.father_name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {student.contact_no || "-"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {student.class}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {student.dob
                            ? new Date(student.dob).toLocaleDateString("en-IN")
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewStudent(student)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
              <div className="px-6 py-12 text-center text-black">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No students found in {selectedClass}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Add Student Modal */}
        {showAddForm && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50 text-black">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Add New Student
                </h3>
                <button
                  onClick={closeAddForm}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="p-6" onSubmit={handleAddSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* All fields except id and school_id */}
                  {Object.keys(initialStudent).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </label>
                      {field === "address" ? (
                        <textarea
                          name={field}
                          value={addForm[field]}
                          onChange={handleAddFormChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          required={[
                            "student_name",
                            "class",
                            "father_name",
                            "mother_name",
                            "dob",
                            "address",
                            "national_id",
                            "email",
                          ].includes(field)}
                        />
                      ) : field === "gender" ? (
                        <select
                          name={field}
                          value={addForm[field]}
                          onChange={handleAddFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      ) : field === "dob" ? (
                        <input
                          type="date"
                          name={field}
                          value={addForm[field]}
                          onChange={handleAddFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          name={field}
                          value={addForm[field]}
                          onChange={handleAddFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          required={[
                            "student_name",
                            "class",
                            "father_name",
                            "mother_name",
                            "dob",
                            "address",
                            "national_id",
                            "email",
                          ].includes(field)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeAddForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Student Modal */}
        {showUpdateForm && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50 text-black">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Update Student
                </h3>
                <button
                  onClick={closeUpdateForm}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="p-6" onSubmit={handleUpdateSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* All fields except id and school_id */}
                  {Object.keys(initialStudent).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </label>
                      {field === "address" ? (
                        <textarea
                          name={field}
                          value={updateForm[field]}
                          onChange={handleUpdateFormChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          required={[
                            "student_name",
                            "class",
                            "father_name",
                            "mother_name",
                            "dob",
                            "address",
                            "national_id",
                            "email",
                          ].includes(field)}
                        />
                      ) : field === "gender" ? (
                        <select
                          name={field}
                          value={updateForm[field]}
                          onChange={handleUpdateFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      ) : field === "dob" ? (
                        <input
                          type="date"
                          name={field}
                          value={
                            updateForm[field]
                              ? updateForm[field].slice(0, 10)
                              : ""
                          }
                          onChange={handleUpdateFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          name={field}
                          value={updateForm[field]}
                          onChange={handleUpdateFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          required={[
                            "student_name",
                            "class",
                            "father_name",
                            "mother_name",
                            "dob",
                            "address",
                            "national_id",
                            "email",
                          ].includes(field)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeUpdateForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Student Modal */}
        {showPopup && selectedStudent && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4 z-50">
            <div className="max-h-[80%] bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Student Details
                </h3>
                <button
                  onClick={handleClosePopup}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        ID
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedStudent.id}
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
                        Student ID
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedStudent.student_id}
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
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        DOB
                      </label>
                      <p className="text-lg text-gray-900">
                        {selectedStudent.dob
                          ? new Date(selectedStudent.dob).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Gender
                      </label>
                      <p className="text-lg text-gray-900">
                        {selectedStudent.gender}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Contact Number
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
              <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                <button
                  onClick={() => openUpdateForm(selectedStudent)}
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
    </div>
  );
};

export default StudentPage;
