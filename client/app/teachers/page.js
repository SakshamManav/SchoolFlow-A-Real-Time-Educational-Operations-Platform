"use client"
import React, { useState } from 'react';
import { Eye, X, Edit, Trash2, Users, Mail, Phone, DollarSign, Calendar, MapPin, GraduationCap, Briefcase, Upload, User } from 'lucide-react';

const TeachersPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Dummy subjects
  const subjects = [
    'Mathematics', 'English', 'Science', 'History', 'Geography', 
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education'
  ];

  const allTeachers = [
    {
      id: 'TCH001',
      name: 'Dr. Rajesh Kumar',
      subject: 'Mathematics',
      email: 'rajesh.kumar@school.com',
      phone: '+91 9876543210',
      salary: 45000,
      address: '123 Teacher Colony, New Delhi',
      qualification: 'Ph.D in Mathematics',
      experience: '12 years',
      gender: 'Male',
      dateOfJoining: '2012-08-15'
    },
    {
      id: 'TCH002',
      name: 'Ms. Priya Sharma',
      subject: 'English',
      email: 'priya.sharma@school.com',
      phone: '+91 9876543211',
      salary: 38000,
      address: '456 Green Park, Mumbai',
      qualification: 'M.A in English Literature',
      experience: '8 years',
      gender: 'Female',
      dateOfJoining: '2016-07-20'
    },
    {
      id: 'TCH003',
      name: 'Mr. Amit Patel',
      subject: 'Science',
      email: 'amit.patel@school.com',
      phone: '+91 9876543212',
      salary: 42000,
      address: '789 Science City, Bangalore',
      qualification: 'M.Sc in Physics',
      experience: '10 years',
      gender: 'Male',
      dateOfJoining: '2014-06-10'
    },
    {
      id: 'TCH004',
      name: 'Dr. Sunita Gupta',
      subject: 'History',
      email: 'sunita.gupta@school.com',
      phone: '+91 9876543213',
      salary: 41000,
      address: '321 Heritage Lane, Jaipur',
      qualification: 'Ph.D in History',
      experience: '15 years',
      gender: 'Female',
      dateOfJoining: '2009-04-25'
    },
    {
      id: 'TCH005',
      name: 'Mr. Vikram Singh',
      subject: 'Physical Education',
      email: 'vikram.singh@school.com',
      phone: '+91 9876543214',
      salary: 35000,
      address: '654 Sports Complex, Pune',
      qualification: 'B.P.Ed',
      experience: '6 years',
      gender: 'Male',
      dateOfJoining: '2018-03-12'
    },
    {
      id: 'TCH006',
      name: 'Ms. Kavya Mehta',
      subject: 'Computer Science',
      email: 'kavya.mehta@school.com',
      phone: '+91 9876543215',
      salary: 48000,
      address: '987 Tech Park, Hyderabad',
      qualification: 'M.Tech in Computer Science',
      experience: '7 years',
      gender: 'Female',
      dateOfJoining: '2017-01-08'
    },
    {
      id: 'TCH007',
      name: 'Mr. Ravi Agarwal',
      subject: 'Mathematics',
      email: 'ravi.agarwal@school.com',
      phone: '+91 9876543216',
      salary: 43000,
      address: '147 Academic Street, Chennai',
      qualification: 'M.Sc in Mathematics',
      experience: '9 years',
      gender: 'Male',
      dateOfJoining: '2015-09-30'
    },
    {
      id: 'TCH008',
      name: 'Dr. Meera Joshi',
      subject: 'Biology',
      email: 'meera.joshi@school.com',
      phone: '+91 9876543217',
      salary: 46000,
      address: '258 Bio Research Center, Kolkata',
      qualification: 'Ph.D in Biology',
      experience: '11 years',
      gender: 'Female',
      dateOfJoining: '2013-11-15'
    }
  ];

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
    setUploadedFile(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    setUploadedFile(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      alert(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  const handleDelete = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      alert(`Teacher ${teacherId} would be deleted`);
      handleCloseModal();
    }
  };

  const handleUpdate = (teacherId) => {
    alert(`Update form for teacher ${teacherId} would open`);
  };

  // Filter teachers based on selected subject
  const filteredTeachers = selectedSubject 
    ? allTeachers.filter(teacher => teacher.subject === selectedSubject)
    : allTeachers;

  const getGenderIcon = (gender) => {
    return gender === 'Male' ? '👨‍🏫' : '👩‍🏫';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Teachers Management</h1>
          </div>
          
          {/* Subject Filter Dropdown */}
          <div className="max-w-md">
            <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Subject
            </label>
            <select
              id="subject-filter"
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Teachers Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Teachers List ({filteredTeachers.length} {selectedSubject ? `in ${selectedSubject}` : 'total'})
            </h2>
          </div>
          
          {filteredTeachers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teacher ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {teacher.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getGenderIcon(teacher.gender)}</span>
                          {teacher.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                          {teacher.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {teacher.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {teacher.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-semibold text-green-600">₹{teacher.salary.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleViewTeacher(teacher)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                {selectedSubject ? `No teachers found for ${selectedSubject}` : 'No teachers found'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedTeacher && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center p-4 z-50">

  <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto ">
    {/* Modal Header */}
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 rounded-t-2xl sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="text-2xl">{getGenderIcon(selectedTeacher.gender)}</span>
          Teacher Details
        </h3>
        <button
          onClick={handleCloseModal}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Basic Information
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Teacher ID</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedTeacher.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedTeacher.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Subject</label>
                      <p className="text-lg text-purple-600 font-medium">{selectedTeacher.subject}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Gender</label>
                      <p className="text-lg text-gray-900">{selectedTeacher.gender}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Contact Information
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-lg text-gray-900">{selectedTeacher.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-lg text-gray-900">{selectedTeacher.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="text-lg text-gray-900">{selectedTeacher.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Professional Information
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Qualification</label>
                        <p className="text-lg text-gray-900">{selectedTeacher.qualification}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Experience</label>
                        <p className="text-lg text-gray-900">{selectedTeacher.experience}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Joining</label>
                        <p className="text-lg text-gray-900">
                          {new Date(selectedTeacher.dateOfJoining).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary & Resume Upload */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Salary & Documents
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Monthly Salary</label>
                        <p className="text-xl font-bold text-green-600">₹{selectedTeacher.salary.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {/* Resume Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Resume
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <label htmlFor="resume-upload" className="cursor-pointer">
                            <span className="text-purple-600 hover:text-purple-700 font-medium">
                              Click to upload resume
                            </span>
                            <input
                              id="resume-upload"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                          {uploadedFile && (
                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-green-700">
                                ✓ {uploadedFile.name} uploaded successfully
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0">
              <button
                onClick={() => handleUpdate(selectedTeacher.id)}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Update
              </button>
              <button
                onClick={() => handleDelete(selectedTeacher.id)}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
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

export default TeachersPage;