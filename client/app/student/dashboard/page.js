"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  Bell,
  Clock,
  BarChart2,
  ClipboardList,
  Calendar,
  LogOut,
} from "lucide-react";

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const today = new Date();

  console.log('Dashboard component mounted'); // Debug log

  useEffect(() => {
    console.log('useEffect running'); // Debug log
    const studentToken = localStorage.getItem('student_token');
    const studentDataStr = localStorage.getItem('student_user');
    
    console.log('Token:', studentToken); // Debug log
    console.log('Student data:', studentDataStr); // Debug log
    
    if (!studentToken) {
      console.log('No token found, redirecting to login'); // Debug log
      alert('Session expired or not logged in. Please login again.');
      router.push('/student/login');
      setLoading(false);
      return;
    }
    
    if (studentDataStr) {
      try {
        const parsedData = JSON.parse(studentDataStr);
        console.log('Parsed student data:', parsedData); // Debug log
        setStudentData(parsedData);
      } catch (error) {
        console.error('Error parsing student data:', error);
        localStorage.removeItem('student_user');
        localStorage.removeItem('student_token');
        router.push('/student/login');
        return;
      }
    } else {
      console.log('No student data found, redirecting to login'); // Debug log
      alert('Student data not found. Please login again.');
      router.push('/student/login');
      return;
    }
    setLoading(false);
  }, [router]);
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If no student data, show error
  if (!studentData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-4">Please try logging in again.</p>
          <button 
            onClick={() => router.push('/student/login')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Default data for demonstration
  const timetable = [
    { time: "09:00 - 09:45", subject: "Mathematics", room: "A101" },
    { time: "10:00 - 10:45", subject: "English", room: "B204" },
    { time: "11:00 - 11:45", subject: "Physics", room: "C307" },
  ];

  const announcements = [
    { title: "Sports Day on Aug 25", excerpt: "All students must assemble at 7:30 AM." },
    { title: "Library Timings", excerpt: "Library will remain open till 6 PM on weekdays." },
  ];

  const stats = { 
    attendance: 92, 
    nextFeeDate: "2025-08-20", 
    pendingFees: "₹0" 
  };

  const deadlines = [
    { title: "Math Assignment: Integrals", due: "2025-08-12" },
    { title: "Physics Lab Report", due: "2025-08-15" },
  ];

  const friendlyDate = (d) => new Date(d).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

  // Logout function
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Clear all student data from localStorage
      localStorage.removeItem('student_token');
      localStorage.removeItem('student_user');
      
      // Redirect to login page
      router.push('/student/login');
    }
  };

  console.log('Rendering dashboard - Loading:', loading, 'Student Data:', studentData); // Debug log

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">Welcome back, <span className="text-indigo-600">{studentData.name}</span>!</h1>
            <p className="text-sm text-slate-500 mt-1">{friendlyDate(today)} • Good to see you — here's what's happening today.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm text-sm hover:shadow-md">
              <Bell className="w-4 h-4" />
              Notifications
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition-colors text-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">{studentData.name.charAt(0)}</div>
              <div className="text-sm text-slate-600">
                <div className="font-medium">{studentData.name}</div>
                <div className="text-xs">Class {studentData.class || 'N/A'} - Section {studentData.section || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column (Main widgets) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Timetable */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <CalendarDays className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Today's Timetable</h3>
                    <p className="text-sm text-slate-500">{friendlyDate(today)}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">{timetable.length} classes</div>
              </div>

              <div className="divide-y">
                {timetable.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-700">{item.subject}</div>
                      <div className="text-xs text-slate-500">{item.room}</div>
                    </div>
                    <div className="text-sm text-slate-600">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-50 p-2 rounded-lg">
                    <Bell className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Recent Announcements</h3>
                    <p className="text-sm text-slate-500">Latest notices from school</p>
                  </div>
                </div>
                <button className="text-sm text-indigo-600">View All</button>
              </div>

              <div className="space-y-3">
                {announcements.map((a, i) => (
                  <div key={i} className="p-3 border rounded-lg bg-gradient-to-br from-white to-slate-50">
                    <div className="text-sm font-medium text-slate-800">{a.title}</div>
                    <div className="text-xs text-slate-600 mt-1">{a.excerpt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column (Sidebar widgets) */}
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-violet-50 p-2 rounded-lg">
                  <BarChart2 className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800">Quick Stats</h3>
                  <p className="text-sm text-slate-500">Your academic overview</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Attendance</span>
                  <span className="text-sm font-semibold text-green-600">{stats.attendance}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Next Fee Date</span>
                  <span className="text-sm font-semibold text-slate-800">{new Date(stats.nextFeeDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pending Fees</span>
                  <span className="text-sm font-semibold text-indigo-600">{stats.pendingFees}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <ClipboardList className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Deadlines</h3>
                    <p className="text-sm text-slate-500">Upcoming submissions</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">{deadlines.length} items</div>
              </div>

              <div className="space-y-3">
                {deadlines.map((d, i) => (
                  <div key={i} className="p-3 border rounded-lg bg-gradient-to-br from-white to-slate-50">
                    <div className="text-sm font-medium text-slate-800">{d.title}</div>
                    <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Due: <span className="ml-1 font-semibold">{new Date(d.due).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-rose-50 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800">Quick Actions</h3>
                  <p className="text-sm text-slate-500">Common tasks</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => router.push('/student/attendance')}
                  className="w-full text-left p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                >
                  <div className="text-sm font-medium text-slate-800">View Attendance</div>
                  <div className="text-xs text-slate-500">Check your attendance record</div>
                </button>
                <button 
                  onClick={() => router.push('/student/profile')}
                  className="w-full text-left p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                >
                  <div className="text-sm font-medium text-slate-800">Update Profile</div>
                  <div className="text-xs text-slate-500">Manage your account</div>
                </button>
                <button 
                  onClick={() => router.push('/student/time-table')}
                  className="w-full text-left p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                >
                  <div className="text-sm font-medium text-slate-800">View Timetable</div>
                  <div className="text-xs text-slate-500">Check class schedule</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;