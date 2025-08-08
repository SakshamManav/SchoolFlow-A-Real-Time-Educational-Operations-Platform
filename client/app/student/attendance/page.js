"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function Attendance() {
  // Mock student attendance data (replace with actual API data in a real app)
  const [attendanceData, setAttendanceData] = useState({
    overallPercentage: 85,
    subjects: [
      { name: 'Mathematics', percentage: 90, totalClasses: 50, attended: 45 },
      { name: 'Physics', percentage: 80, totalClasses: 40, attended: 32 },
      { name: 'Chemistry', percentage: 88, totalClasses: 45, attended: 40 },
      { name: 'English', percentage: 92, totalClasses: 30, attended: 28 },
    ],
    absentDates: [
      { date: '2025-07-10', subject: 'Physics' },
      { date: '2025-07-15', subject: 'Chemistry' },
      { date: '2025-08-01', subject: 'Mathematics' },
    ],
  });

  // Generate a simple calendar view for the current month
  const today = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonth = monthNames[today.getMonth()];
  const currentYear = today.getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <Head>
        <title>Attendance Tracker</title>
        <meta name="description" content="Student Attendance Tracking Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">My Attendance</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Attendance */}
          <div className="bg-indigo-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Overall Attendance</h2>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-indigo-600 progress-ring stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - attendanceData.overallPercentage / 100)}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-indigo-800">
                  {attendanceData.overallPercentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Subject-wise Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Subject-wise Attendance</h2>
            <div className="space-y-4">
              {attendanceData.subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-800 font-medium">{subject.name}</span>
                    <span className="text-gray-600">{subject.percentage}% ({subject.attended}/{subject.totalClasses})</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Absent Dates */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              Absent Dates - {currentMonth} {currentYear}
            </h2>
            {attendanceData.absentDates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {attendanceData.absentDates.map((absence, index) => (
                  <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                    <svg
                      className="w-6 h-6 text-red-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-gray-800 font-medium">{absence.date}</p>
                      <p className="text-sm text-gray-500">{absence.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No absences recorded this month.</p>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .progress-ring {
          transition: stroke-dashoffset 0.35s;
        }
      `}</style>
    </div>
  );
}