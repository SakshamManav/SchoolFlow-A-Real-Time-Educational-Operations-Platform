"use client"
import Head from 'next/head';
import { useState } from 'react';

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState({
    overallPercentage: 85,
    totalDays: 120,
    presentDays: 102,
    subjects: [
      { name: 'Mathematics', percentage: 90, totalClasses: 50, attended: 45, icon: '📐' },
      { name: 'Physics', percentage: 80, totalClasses: 40, attended: 32, icon: '⚡' },
      { name: 'Chemistry', percentage: 88, totalClasses: 45, attended: 40, icon: '🧪' },
      { name: 'English', percentage: 92, totalClasses: 30, attended: 28, icon: '📚' },
      { name: 'Computer Science', percentage: 95, totalClasses: 35, attended: 33, icon: '💻' },
      { name: 'Biology', percentage: 83, totalClasses: 42, attended: 35, icon: '🔬' },
    ],
    absentDates: [
      { date: '2025-07-10', subject: 'Physics', reason: 'Medical Leave' },
      { date: '2025-07-15', subject: 'Chemistry', reason: 'Family Function' },
      { date: '2025-08-01', subject: 'Mathematics', reason: 'Not Feeling Well' },
    ],
    recentAttendance: [
      { date: '2025-08-11', status: 'present' },
      { date: '2025-08-10', status: 'present' },
      { date: '2025-08-09', status: 'present' },
      { date: '2025-08-08', status: 'absent' },
      { date: '2025-08-07', status: 'present' },
    ],
    attendanceStreak: 3,
    lastMonthPercentage: 90,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Head>
        <title>Attendance Tracker</title>
        <meta name="description" content="Student Attendance Tracking Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 -mx-8 -mt-8 mb-8 p-6 rounded-t-2xl">
          <h1 className="text-3xl font-bold text-white text-center">Attendance Dashboard</h1>
          <p className="text-indigo-100 text-center mt-2">Academic Year 2025-26</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Present Days Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Present Days</h3>
              <span className="text-green-500 bg-green-50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{attendanceData.presentDays}</p>
            <p className="text-sm text-gray-500">out of {attendanceData.totalDays} days</p>
          </div>

          {/* Overall Attendance Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Overall Attendance</h3>
              <span className="text-indigo-500 bg-indigo-50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
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
                  ></circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="text-2xl font-bold text-indigo-800">{attendanceData.overallPercentage}%</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Current Streak</div>
                <div className="text-xl font-bold text-indigo-600">{attendanceData.attendanceStreak} days 🔥</div>
              </div>
            </div>
          </div>

          {/* Monthly Comparison Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Last Month</h3>
              <span className="text-blue-500 bg-blue-50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{attendanceData.lastMonthPercentage}%</p>
            <div className="flex items-center mt-2">
              {attendanceData.lastMonthPercentage > attendanceData.overallPercentage ? (
                <span className="text-green-500 text-sm">↑ 5% improvement</span>
              ) : (
                <span className="text-red-500 text-sm">↓ 5% decrease</span>
              )}
            </div>
          </div>
        </div>

        {/* Subject-wise Attendance */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Subject-wise Attendance</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Good</span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full ml-2"></span>
              <span>Average</span>
              <span className="w-3 h-3 bg-red-500 rounded-full ml-2"></span>
              <span>Needs Attention</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendanceData.subjects.map((subject, index) => {
              const getStatusClasses = (percentage) => {
                if (percentage >= 90) return { text: 'text-green-500', bg: 'bg-green-500' };
                if (percentage >= 75) return { text: 'text-yellow-500', bg: 'bg-yellow-500' };
                return { text: 'text-red-500', bg: 'bg-red-500' };
              };
              const statusClasses = getStatusClasses(subject.percentage);
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="font-medium text-gray-800">{subject.name}</span>
                    </div>
                    <span className={`${statusClasses.text} font-semibold`}>
                      {subject.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>Classes Attended: {subject.attended}</span>
                    <span>Total Classes: {subject.totalClasses}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${statusClasses.bg} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Attendance & Absences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Attendance */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Attendance
            </h2>
            <div className="space-y-3">
              {attendanceData.recentAttendance.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{day.date}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    day.status === 'present' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Absence History */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Absences
            </h2>
            <div className="space-y-3">
              {attendanceData.absentDates.map((absence, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">{absence.date}</span>
                    <span className="text-red-600 font-medium">{absence.subject}</span>
                  </div>
                  <p className="text-sm text-gray-600">{absence.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
