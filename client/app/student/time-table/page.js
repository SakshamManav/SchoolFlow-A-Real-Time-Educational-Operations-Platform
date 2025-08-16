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
  const [timeSlots, setTimeSlots] = useState([]);

  // Determine the current day for highlighting
  const [currentDay, setCurrentDay] = useState('');
  
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
        setTimetable(timetable);
        
        // Extract unique time slots from timetable
        const allTimeSlots = Object.values(timetable)
          .flat()
          .map(slot => slot.time)
          .filter((time, index, array) => array.indexOf(time) === index)
          .sort();
        setTimeSlots(allTimeSlots);
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
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="p-4 text-left text-indigo-700 font-semibold">Time</th>
                    {schoolDays.map((day) => (
                      <th
                        key={day}
                        className={`p-4 text-center text-indigo-700 font-semibold ${
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
                  {timeSlots.map((time, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 text-gray-700 font-medium bg-gray-50">{time}</td>
                      {schoolDays.map((day) => {
                        const slot = timetable[day]?.find((slot) => slot.time === time);
                        return (
                          <td
                            key={`${day}-${time}`}
                            className={`p-4 text-center ${
                              day === currentDay ? 'bg-indigo-50' : 'bg-white'
                            }`}
                          >
                            {slot ? (
                              <div className="space-y-1">
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