"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import {
  CalendarDays,
  Bell,
  Clock,
  BarChart2,
  ClipboardList,
  Calendar,
} from "lucide-react";

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const today = new Date();

  
  useEffect(() => {
    const studentToken = localStorage.getItem('student_token');
    if (!studentToken) {
      alert('Session expired or not logged in. Please login again.');
      // Uncomment the next line to enable redirect
      // router.push('/student/login');
      setLoading(false);
      return;
    }
    const studentDataStr = localStorage.getItem('student_user');
    if (studentDataStr) {
      setStudentData(JSON.parse(studentDataStr));
    }
    setLoading(false);
  }, []);
  // Hydration guard
  // if (!hydrated || loading) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  //     </div>
  //   );
  // }
   
  

  // if (!studentData) {
  //   return null;
  // }

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

  if (!studentData) {
    return <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">Loading...</div>;
  }
  const friendlyDate = (d) => new Date(d).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">Welcome back, <span className="text-indigo-600">{studentData.name}</span>!</h1>
            <p className="text-sm text-slate-500 mt-1">{friendlyDate(today)} • Good to see you — here’s what’s happening today.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm text-sm hover:shadow-md">
              <Bell className="w-4 h-4" />
              Notifications
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
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-sm">
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
            </motion.div>

            {/* Announcements */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-5 shadow-sm">
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

              <ul className="space-y-3">
                {announcements.slice(0, 3).map((ann, i) => (
                  <li key={i} className="p-3 rounded-lg hover:bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-800">{ann.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{ann.excerpt}</div>
                      </div>
                      <div className="text-xs text-slate-400">{/* Optional: date */}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <ClipboardList className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Upcoming Deadlines</h3>
                    <p className="text-sm text-slate-500">Assignments and submissions due soon</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">{deadlines.length} items</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            </motion.div>
          </div>

          {/* Right column (Quick stats) */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <BarChart2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">Quick Stats</h3>
                    <p className="text-sm text-slate-500">Snapshot of important info</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Summary</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Overall Attendance</div>
                    <div className="text-xl font-semibold text-slate-800">{stats.attendance}%</div>
                  </div>
                  <div className="w-20 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">{stats.attendance >= 75 ? "Good" : "Alert"}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Next Fee Due</div>
                    <div className="text-sm font-semibold text-slate-700">{new Date(stats.nextFeeDate).toLocaleDateString()}</div>
                  </div>
                  <div className="text-sm text-slate-600">{stats.pendingFees}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Last Login</div>
                    <div className="text-sm font-semibold text-slate-700">{new Date().toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-slate-600">IP • masked</div>
                </div>

                <div className="mt-4">
                  <button className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:brightness-95">Pay Fees</button>
                </div>
              </div>
            </motion.div>

            {/* Small widget: Today timeline or quick links */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-50 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-800">Today at a glance</h4>
                    <div className="text-xs text-slate-500">{timetable[0]?.time || "No classes today"}</div>
                  </div>
                </div>
                <div className="text-xs text-indigo-600">{timetable[0]?.subject}</div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 rounded-lg bg-slate-50 text-sm">My Profile</button>
                <button className="px-3 py-1 rounded-lg bg-slate-50 text-sm">Assignments</button>
                <button className="px-3 py-1 rounded-lg bg-slate-50 text-sm">Messages</button>
                <button className="px-3 py-1 rounded-lg bg-slate-50 text-sm">Timetable</button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer small */}
        <div className="mt-6 text-xs text-slate-400 text-center">Need changes? Plug your real data from API or CMS — this component is built to accept props.</div>
      </div>
    </div>
  );
  }

// Wrap the dashboard with authentication
export default function DashboardPage() {
  return <StudentDashboard />;
}

