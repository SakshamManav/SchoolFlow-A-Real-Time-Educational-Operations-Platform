"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function Profile() {
  // Mock student data (replace with actual API data in a real app)
  const [student, setStudent] = useState({
    student_id: "STU12345",
    student_name: "Alex Smith",
    class: "10",
    section: "A",
    father_name: "John Smith",
    mother_name: "Emma Smith",
    dob: "2008-05-15",
    gender: "Male",
    contact_no: "+91-98765-43210",
    admission_year: "2020",
    prev_school_name: "Sunrise Academy",
    address: "123, Green Avenue, New Delhi, India",
    national_id: "IND123456789",
    email: "alex.smith@example.com",
    stud_pic_url: "https://via.placeholder.com/150",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <Head>
        <title>Student Profile</title>
        <meta name="description" content="Student Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Student Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center">
            <img
              src={student.stud_pic_url}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{student.student_name}</h2>
            <p className="text-sm text-gray-500">Student ID: {student.student_id}</p>
          </div>

          {/* Personal Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Father's Name</p>
                <p className="text-gray-800 font-medium">{student.father_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mother's Name</p>
                <p className="text-gray-800 font-medium">{student.mother_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="text-gray-800 font-medium">{student.dob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="text-gray-800 font-medium">{student.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <p className="text-gray-800 font-medium">{student.contact_no}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-800 font-medium">{student.email}</p>
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4 mt-6">Academic Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="text-gray-800 font-medium">{student.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Section</p>
                <p className="text-gray-800 font-medium">{student.section}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Admission Year</p>
                <p className="text-gray-800 font-medium">{student.admission_year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Previous School</p>
                <p className="text-gray-800 font-medium">{student.prev_school_name}</p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4 mt-6">Additional Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-gray-800 font-medium">{student.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">National ID</p>
                <p className="text-gray-800 font-medium">{student.national_id}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}