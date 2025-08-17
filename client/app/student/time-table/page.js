"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AuthWrapper from '../components/AuthWrapper';

export default function Timetable() {
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [classInfo, setClassInfo] = useState({ class_id: '', class_name: '' });
  const [schoolDays, setSchoolDays] = useState([]);
  const [displayLectures, setDisplayLectures] = useState([]);

  // Helper function for ordinal numbers
  function getOrdinal(n) {
    if (n === 1) return 'st';
    if (n === 2) return 'nd';
    if (n === 3) return 'rd';
    return 'th';
  }

  // Migration function to convert old time-based data to new lecture-based format
  const migrateTimetableData = (timetable) => {
    if (!timetable) return {};
    
    const oldTimeSlots = [
      "09:00 AM - 10:00 AM",
      "10:15 AM - 11:15 AM", 
      "11:30 AM - 12:30 PM",
      "01:30 PM - 02:30 PM",
    ];
    
    const migratedTimetable = {};
    
    Object.keys(timetable).forEach(day => {
      migratedTimetable[day] = [];
      
      timetable[day].forEach(slot => {
        // Check if this is old format (time-based) and convert to new format
        const oldTimeIndex = oldTimeSlots.indexOf(slot.time);
        if (oldTimeIndex !== -1) {
          // Convert old time slot to lecture format
          const lectureNumber = oldTimeIndex + 1;
          const lectureName = `${lectureNumber}${getOrdinal(lectureNumber)} Lecture`;
          migratedTimetable[day].push({
            ...slot,
            time: lectureName
          });
        } else {
          // Already in new format or keep as is
          migratedTimetable[day].push(slot);
        }
      });
    });
    
    return migratedTimetable;
  };

  // Function to get all lectures that should be displayed (both filled and intentionally empty)
  const getDisplayLecturesFromTimetable = (timetable) => {
    if (!timetable) return [];
    
    const allLecturesInData = new Set();
    const maxLectureNumber = { value: 0 };
    
    // Find all lectures mentioned in the data and the highest lecture number
    Object.keys(timetable).forEach(day => {
      timetable[day].forEach(slot => {
        allLecturesInData.add(slot.time);
        // Extract lecture number to find the maximum
        const match = slot.time.match(/(\d+)/);
        if (match) {
          const lectureNum = parseInt(match[1]);
          maxLectureNumber.value = Math.max(maxLectureNumber.value, lectureNum);
        }
      });
    });
    
    // Create a complete list from 1st lecture to the highest found lecture
    const lectures = [];
    for (let i = 1; i <= maxLectureNumber.value; i++) {
      const lectureName = `${i}${getOrdinal(i)} Lecture`;
      lectures.push(lectureName);
    }
    
    return lectures;
  };

  // Determine the current day for highlighting
  const [currentDay, setCurrentDay] = useState('');
  
  // Set current day on client side only to avoid hydration mismatch
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  // Fetch timetable data from API
  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('student_token');
      
      if (!token) {
        setError('Please log in to view your timetable');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5001/student/timetable/my-timetable', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        const { classId, className, schoolDays, timetable } = data.data;
        setClassInfo({ class_id: classId, class_name: className });
        setSchoolDays(schoolDays);
        
        // Migrate old time-based data to new lecture-based format
        const migratedTimetable = migrateTimetableData(timetable);
        setTimetable(migratedTimetable);
        
        // Get display lectures from migrated data
        const lectures = getDisplayLecturesFromTimetable(migratedTimetable);
        setDisplayLectures(lectures);
      } else {
        setError(data.error || 'Failed to fetch timetable');
      }
    } catch (err) {
      console.error('Error fetching timetable:', err);
      setError('Failed to load timetable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  return (
     <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
        <Head>
          <title>Weekly Timetable</title>
          <meta name="description" content="Student Weekly Class Schedule" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-indigo-800">Weekly Timetable</h1>
              {classInfo.class_name && (
                <p className="text-lg text-gray-600 mt-2">
                  Class: <span className="font-semibold">{classInfo.class_name}</span> 
                  {classInfo.class_id && (
                    <span className="text-sm text-gray-500 ml-2">({classInfo.class_id})</span>
                  )}
                </p>
              )}
            </div>
            <button
              onClick={fetchTimetable}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-600">Loading your timetable...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
              <button
                onClick={fetchTimetable}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && Object.keys(timetable).length > 0 && (
            <div className="overflow-x-auto">
              <div className="min-w-max">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="p-4 text-left text-indigo-700 font-semibold w-48 min-w-48 border-r border-indigo-200">Lecture</th>
                      {schoolDays.map((day) => (
                        <th
                          key={day}
                          className={`p-4 text-center text-indigo-700 font-semibold w-48 min-w-48 border-r border-indigo-200 ${
                            day === currentDay ? 'bg-indigo-200' : ''
                          }`}
                        >
                          {day}
                          {day === currentDay && (
                            <span className="block text-xs text-indigo-600 font-normal">Today</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayLectures.map((lecture, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}>
                        <td className="p-4 text-gray-700 font-medium w-48 min-w-48 border-r border-gray-200 bg-gray-50">{lecture}</td>
                        {schoolDays.map((day) => {
                          const slot = timetable[day]?.find((slot) => slot.time === lecture);
                        return (
                          <td
                            key={`${day}-${lecture}`}
                            className={`p-4 align-top w-48 min-w-48 border-r border-gray-200 ${
                              day === currentDay ? 'bg-indigo-50' : 'bg-white'
                            }`}
                          >
                            {slot ? (
                              <div className="space-y-2 text-left">
                                <p className="text-gray-800 font-medium text-sm">
                                  {slot.subject}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {slot.teacher}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {slot.room}
                                </p>
                              </div>
                            ) : (
                              <p className="text-gray-400 text-sm">Free Period</p>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && !error && Object.keys(timetable).length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                <p>No timetable available</p>
                <p className="text-sm mt-2">Your class timetable hasn't been created yet.</p>
              </div>
            </div>
          )}
        </main>
      </div>
 </>
  );
}