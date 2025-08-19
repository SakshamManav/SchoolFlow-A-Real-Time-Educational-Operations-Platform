"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  FileText,
  ChevronRight,
  Bell,
  Award,
  Target,
  Activity,
  PieChart,
  BarChart3,
  RefreshCw,
  CalendarDays,
  UserCheck,
  ClipboardList
} from "lucide-react";

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    presentToday: 0,
    pendingAssignments: 0,
    upcomingClasses: 0,
    attendanceRate: 0
  });
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const teacherToken = localStorage.getItem('teacher_token');
    const teacherDataStr = localStorage.getItem('teacher_user');
    
    if (teacherDataStr) {
      try {
        const parsedData = JSON.parse(teacherDataStr);
        setTeacherData(parsedData);
        fetchDashboardData(parsedData.id, teacherToken);
      } catch (error) {
        console.error('Error parsing teacher data:', error);
        setError('Failed to load teacher data');
      }
    }
    
    // Set initial data
    initializeData();
  }, []);

  const initializeData = () => {
    // Mock data for demonstration
    setStats({
      totalClasses: 6,
      totalStudents: 185,
      presentToday: 142,
      pendingAssignments: 8,
      upcomingClasses: 3,
      attendanceRate: 76.8
    });

    setTodaySchedule([
      {
        id: 1,
        subject: "Mathematics",
        class: "Class 10-A",
        time: "09:00 - 09:45",
        room: "Room 201",
        status: "completed"
      },
      {
        id: 2,
        subject: "Mathematics", 
        class: "Class 10-B",
        time: "10:00 - 10:45",
        room: "Room 201",
        status: "current"
      },
      {
        id: 3,
        subject: "Advanced Math",
        class: "Class 12-A",
        time: "14:00 - 14:45", 
        room: "Room 203",
        status: "upcoming"
      },
      {
        id: 4,
        subject: "Mathematics",
        class: "Class 9-C",
        time: "15:30 - 16:15",
        room: "Room 201",
        status: "upcoming"
      }
    ]);

    setRecentActivities([
      {
        id: 1,
        type: "assignment",
        message: "New assignment submitted by John Doe (Class 10-A)",
        time: "5 minutes ago",
        icon: FileText
      },
      {
        id: 2,
        type: "attendance",
        message: "Attendance marked for Class 10-B",
        time: "1 hour ago",
        icon: UserCheck
      },
      {
        id: 3,
        type: "grade",
        message: "Grades updated for Math Quiz - Class 12-A",
        time: "2 hours ago",
        icon: Award
      },
      {
        id: 4,
        type: "notification",
        message: "Parent-teacher meeting scheduled for next week",
        time: "3 hours ago",
        icon: Bell
      }
    ]);

    setLoading(false);
  };

  const fetchDashboardData = async (teacherId, token) => {
    try {
      // Here you would fetch real data from your API
      // const response = await fetch(`http://localhost:5001/teacher/dashboard/${teacherId}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // Process and set the real data
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "blue" }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      indigo: "from-indigo-500 to-indigo-600",
      red: "from-red-500 to-red-600"
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {trend && (
                <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
              )}
            </div>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
    );
  };

  const ScheduleCard = ({ schedule }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'current': return 'bg-blue-100 text-blue-800';
        case 'upcoming': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'completed': return CheckCircle;
        case 'current': return Clock;
        case 'upcoming': return Calendar;
        default: return Clock;
      }
    };

    const StatusIcon = getStatusIcon(schedule.status);

    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${getStatusColor(schedule.status)}`}>
            <StatusIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{schedule.subject}</h4>
            <p className="text-sm text-gray-600">{schedule.class} • {schedule.room}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">{schedule.time}</p>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(schedule.status)}`}>
            {schedule.status}
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
          <span className="text-lg font-medium text-gray-700">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {teacherData?.name || 'Teacher'}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
                <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <StatCard
              icon={BookOpen}
              title="Total Classes"
              value={stats.totalClasses}
              subtitle="Active classes"
              color="purple"
            />
            <StatCard
              icon={Users}
              title="Total Students"
              value={stats.totalStudents}
              subtitle="Across all classes"
              color="blue"
            />
            <StatCard
              icon={UserCheck}
              title="Present Today"
              value={stats.presentToday}
              subtitle={`${stats.attendanceRate}% attendance`}
              color="green"
            />
            <StatCard
              icon={ClipboardList}
              title="Pending Tasks"
              value={stats.pendingAssignments}
              subtitle="Assignments to grade"
              color="orange"
            />
            <StatCard
              icon={Calendar}
              title="Upcoming Classes"
              value={stats.upcomingClasses}
              subtitle="Today remaining"
              color="indigo"
            />
            <StatCard
              icon={TrendingUp}
              title="Performance"
              value="92%"
              subtitle="Class average"
              trend={5.2}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    View All <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todaySchedule.map((schedule) => (
                    <ScheduleCard key={schedule.id} schedule={schedule} />
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    View All <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <IconComponent className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: UserCheck, label: "Mark Attendance", color: "bg-green-500", href: "/teacher/attendance" },
                  { icon: FileText, label: "Create Assignment", color: "bg-blue-500", href: "/teacher/assignments" },
                  { icon: Award, label: "Grade Papers", color: "bg-purple-500", href: "/teacher/grading" },
                  { icon: Calendar, label: "View Schedule", color: "bg-orange-500", href: "/teacher/schedule" }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TeacherDashboard;
