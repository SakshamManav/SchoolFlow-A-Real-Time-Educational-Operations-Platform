"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  // Mock student data (replace with actual API calls in a real app)
  const [student, setStudent] = useState({
    name: "Alex Smith",
    attendance: 92,
    feeDueDate: "2025-08-15",
  });

  // Mock timetable data
  const timetable = [
    { time: "09:00 AM - 10:30 AM", subject: "Mathematics", room: "Room 101" },
    { time: "10:45 AM - 12:15 PM", subject: "Physics", room: "Lab B" },
    { time: "01:00 PM - 02:30 PM", subject: "English Literature", room: "Room 204" },
  ];

  // Mock announcements
  const announcements = [
    { id: 1, title: "School Holiday", date: "2025-08-10", content: "School will be closed on August 10th for a public holiday." },
    { id: 2, title: "Parent-Teacher Meeting", date: "2025-08-12", content: "Scheduled for next Tuesday at 3 PM." },
    { id: 3, title: "Science Fair", date: "2025-08-20", content: "Submit your projects by August 18th!" },
  ];

  // Mock upcoming deadlines
  const deadlines = [
    { id: 1, assignment: "Math Homework", dueDate: "2025-08-09", course: "Mathematics" },
    { id: 2, assignment: "Physics Lab Report", dueDate: "2025-08-11", course: "Physics" },
  ];

  // Get current date for display
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Head>
        <title>Student Dashboard</title>
        <meta name="description" content="Student Dashboard with timetable, announcements, and more" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">
            Welcome back, {student.name}!
          </h1>
          <p className="text-gray-600">{today}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Timetable */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Today's Timetable</h2>
            {timetable.length > 0 ? (
              <ul className="space-y-4">
                {timetable.map((item, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="font-medium text-gray-800">{item.subject}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                    <p className="text-sm text-gray-500">{item.room}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No classes scheduled for today.</p>
            )}
          </div>

          {/* Recent Announcements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Recent Announcements</h2>
            <ul className="space-y-4">
              {announcements.slice(0, 3).map((announcement) => (
                <li key={announcement.id} className="border-b pb-2">
                  <p className="font-medium text-gray-800">{announcement.title}</p>
                  <p className="text-sm text-gray-500">{announcement.date}</p>
                  <p className="text-sm text-gray-600">{announcement.content}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-indigo-600">{student.attendance}%</p>
              </div>
              <div>
                <p className="text-gray-600">Upcoming Fee Due Date</p>
                <p className="text-lg font-medium text-red-500">{student.feeDueDate}</p>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Upcoming Deadlines</h2>
            {deadlines.length > 0 ? (
              <ul className="space-y-4">
                {deadlines.map((deadline) => (
                  <li key={deadline.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium text-gray-800">{deadline.assignment}</p>
                      <p className="text-sm text-gray-500">{deadline.course}</p>
                    </div>
                    <p className="text-sm text-red-500 font-medium">{deadline.dueDate}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No upcoming deadlines.</p>
            )}
          </div>
        </div>
      </main>
    </div></>
  );
}