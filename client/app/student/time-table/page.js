"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Timetable() {
  // Mock timetable data with room numbers (replace with actual API data in a real app)
  const [timetable, setTimetable] = useState({
    Monday: [
      { time: '09:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
      { time: '10:15 AM - 11:15 AM', subject: 'Physics', teacher: 'Dr. Lee', room: 'Lab B' },
      { time: '11:30 AM - 12:30 PM', subject: 'English', teacher: 'Ms. Carter', room: 'Room 204' },
      { time: '01:30 PM - 02:30 PM', subject: 'Chemistry', teacher: 'Mrs. Patel', room: 'Lab A' },
    ],
    Tuesday: [
      { time: '09:00 AM - 10:00 AM', subject: 'English', teacher: 'Ms. Carter', room: 'Room 204' },
      { time: '10:15 AM - 11:15 AM', subject: 'Biology', teacher: 'Dr. Brown', room: 'Lab C' },
      { time: '11:30 AM - 12:30 PM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
      { time: '01:30 PM - 02:30 PM', subject: 'History', teacher: 'Mr. Singh', room: 'Room 305' },
    ],
    Wednesday: [
      { time: '09:00 AM - 10:00 AM', subject: 'Physics', teacher: 'Dr. Lee', room: 'Lab B' },
      { time: '10:15 AM - 11:15 AM', subject: 'Chemistry', teacher: 'Mrs. Patel', room: 'Lab A' },
      { time: '11:30 AM - 12:30 PM', subject: 'English', teacher: 'Ms. Carter', room: 'Room 204' },
      { time: '01:30 PM - 02:30 PM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
    ],
    Thursday: [
      { time: '09:00 AM - 10:00 AM', subject: 'Biology', teacher: 'Dr. Brown', room: 'Lab C' },
      { time: '10:15 AM - 11:15 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
      { time: '11:30 AM - 12:30 PM', subject: 'History', teacher: 'Mr. Singh', room: 'Room 305' },
      { time: '01:30 PM - 02:30 PM', subject: 'Physics', teacher: 'Dr. Lee', room: 'Lab B' },
    ],
    Friday: [
      { time: '09:00 AM - 10:00 AM', subject: 'Chemistry', teacher: 'Mrs. Patel', room: 'Lab A' },
      { time: '10:15 AM - 11:15 AM', subject: 'English', teacher: 'Ms. Carter', room: 'Room 204' },
      { time: '11:30 AM - 12:30 PM', subject: 'Biology', teacher: 'Dr. Brown', room: 'Lab C' },
      { time: '01:30 PM - 02:30 PM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
    ],
  });

  // Determine the current day for highlighting
  const [currentDay, setCurrentDay] = useState('');
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  // Define time slots for the rows
  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:15 AM - 11:15 AM',
    '11:30 AM - 12:30 PM',
    '01:30 PM - 02:30 PM',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <Head>
        <title>Weekly Timetable</title>
        <meta name="description" content="Student Weekly Class Schedule" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Weekly Timetable</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-4 text-left text-indigo-700 font-semibold">Time</th>
                {Object.keys(timetable).map((day) => (
                  <th
                    key={day}
                    className={`p-4 text-center text-indigo-700 font-semibold ${
                      day === currentDay ? 'bg-indigo-200' : ''
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 text-gray-700 font-medium">{time}</td>
                  {Object.keys(timetable).map((day) => (
                    <td
                      key={`${day}-${time}`}
                      className={`p-4 text-center ${
                        day === currentDay ? 'bg-indigo-50' : 'bg-white'
                      }`}
                    >
                      {timetable[day].find((slot) => slot.time === time) ? (
                        <div>
                          <p className="text-gray-800 font-medium">
                            {timetable[day].find((slot) => slot.time === time).subject}
                          </p>
                          <p className="text-sm text-gray-500">
                            {timetable[day].find((slot) => slot.time === time).teacher}
                          </p>
                          <p className="text-sm text-gray-500">
                            {timetable[day].find((slot) => slot.time === time).room}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400">Free</p>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}