"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus, FaChalkboardTeacher, FaBook, FaDoorOpen } from "react-icons/fa";

export default function AdminTimetable() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewClass, setViewClass] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  const [creatingClass, setCreatingClass] = useState(false);
  const [formData, setFormData] = useState({});
  const [createFormData, setCreateFormData] = useState({
    classId: "",
    className: "", // Added className
    schoolDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    timetable: {},
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:15 AM - 11:15 AM",
    "11:30 AM - 12:30 PM",
    "01:30 PM - 02:30 PM",
  ];
  const possibleDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [currentDay, setCurrentDay] = useState("");

  // Fetch all classes on mount
  useEffect(() => {
  const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5001/admin/timetable/classes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { success, data } = await response.json();
        if (success) {
          setClasses(
            data.map((cls) => ({
              classId: cls.class_id,
              className: cls.class_name, // Include className
              schoolDays: cls.school_days.split(","),
              timetable: {}, // Load timetable on demand
            }))
          );
        } else {
          console.error("Failed to fetch classes:", data);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setCurrentDay(days[new Date().getDay()]);
  }, []);

  // Handle view button click
  const handleViewClass = async (classId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/admin/timetable/timetable/${classId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const { success, data } = await response.json();
      if (success) {
        setViewClass(data);
      } else {
        console.error("Failed to fetch timetable:", data);
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  // Handle edit button click
  const handleEditClass = (classId, timetable, schoolDays) => {
    setEditingClass(classId);
    const initialFormData = {};
    schoolDays.forEach((day) => {
      timeSlots.forEach((time) => {
        const slot = timetable[day]?.find((s) => s.time === time) || {
          subject: "",
          teacher: "",
          room: "",
        };
        initialFormData[`${day}-${time}`] = {
          subject: slot.subject || "",
          teacher: slot.teacher || "",
          room: slot.room || "",
        };
      });
    });
    setFormData(initialFormData);
  };

  // Handle form input changes for edit modal
  const handleInputChange = (day, time, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [`${day}-${time}`]: {
        ...prev[`${day}-${time}`],
        [field]: value,
      },
    }));
  };

  // Handle form input changes for create modal
  const handleCreateInputChange = (day, time, field, value) => {
    setCreateFormData((prev) => ({
      ...prev,
      timetable: {
        ...prev.timetable,
        [day]: {
          ...(prev.timetable[day] || {}),
          [time]: {
            ...(prev.timetable[day]?.[time] || {
              subject: "",
              teacher: "",
              room: "",
            }),
            [field]: value,
          },
        },
      },
    }));
  };

  // Handle school days change for create modal
  const handleSchoolDaysChange = (day) => {
    setCreateFormData((prev) => {
      const newSchoolDays = prev.schoolDays.includes(day)
        ? prev.schoolDays.filter((d) => d !== day)
        : [...prev.schoolDays, day].sort(
            (a, b) => possibleDays.indexOf(a) - possibleDays.indexOf(b)
          );
      return { ...prev, schoolDays: newSchoolDays };
    });
  };

  // Handle form submission for updating timetable
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTimetable = {};
    const schoolDays = classes.find(
      (cls) => cls.classId === editingClass
    ).schoolDays;
    schoolDays.forEach((day) => {
      updatedTimetable[day] = timeSlots
        .map((time) => ({
          time,
          subject: formData[`${day}-${time}`].subject,
          teacher: formData[`${day}-${time}`].teacher,
          room: formData[`${day}-${time}`].room,
        }))
        .filter((slot) => slot.subject || slot.teacher || slot.room);
    });

    try {
      const response = await fetch(
        `http://localhost:5001/admin/timetable/update/${editingClass}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ schoolDays, timetable: updatedTimetable }),
        }
      );
      const { success } = await response.json();
      if (success) {
        setClasses((prevClasses) =>
          prevClasses.map((cls) =>
            cls.classId === editingClass
              ? { ...cls, timetable: updatedTimetable }
              : cls
          )
        );
        setEditingClass(null);
        setFormData({});
      } else {
        console.error("Failed to update timetable:", await response.json());
      }
    } catch (error) {
      console.error("Error updating timetable:", error);
    }
  };

  // Handle form submission for creating a new class
  const handleCreateClass = async (e) => {
    e.preventDefault();
    const newTimetable = {};
    createFormData.schoolDays.forEach((day) => {
      newTimetable[day] = timeSlots
        .map((time) => ({
          time,
          subject: createFormData.timetable[day]?.[time]?.subject || "",
          teacher: createFormData.timetable[day]?.[time]?.teacher || "",
          room: createFormData.timetable[day]?.[time]?.room || "",
        }))
        .filter((slot) => slot.subject || slot.teacher || slot.room);
    });

    try {
      console.log("Sending create class request with body:", {
        classId: createFormData.classId,
        className: createFormData.className,
        schoolDays: createFormData.schoolDays,
        timetable: newTimetable,
      });
      const response = await fetch("http://localhost:5001/admin/timetable/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          classId: createFormData.classId,
          className: createFormData.className, // Include className
          schoolDays: createFormData.schoolDays,
          timetable: newTimetable,
        }),
      });
      const responseData = await response.json();
      console.log("Create class response:", responseData);
      if (responseData.success) {
        setClasses((prev) => [
          ...prev,
          {
            classId: responseData.data.classId,
            className: responseData.data.className, // Include className
            schoolDays: responseData.data.schoolDays,
            timetable: newTimetable,
          },
        ]);
        setCreatingClass(false);
        setCreateFormData({
          classId: "",
          className: "",
          schoolDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          timetable: {},
        });
      } else {
        console.error("Failed to create class:", responseData.error);
        alert(`Failed to create class: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Error creating class. Please try again.");
    }
  };

  // Handle delete button click for entire class or slot
  const handleDeleteClass = (classId) => {
    setDeleteConfirmation({ classId, type: "class" });
  };

  const handleDeleteSlot = (classId, day, time) => {
    setDeleteConfirmation({ classId, day, time, type: "slot" });
  };

  // Confirm deletion
  const confirmDelete = async () => {
    try {
      if (deleteConfirmation.type === "class") {
        const response = await fetch(
          `http://localhost:5001/admin/timetable/delete/${deleteConfirmation.classId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { success } = await response.json();
        if (success) {
          setClasses((prevClasses) =>
            prevClasses.filter(
              (cls) => cls.classId !== deleteConfirmation.classId
            )
          );
        } else {
          console.error("Failed to delete class:", await response.json());
        }
      } else if (deleteConfirmation.type === "slot") {
        const response = await fetch(
          "http://localhost:5001/admin/timetable/delete/slot",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              classId: deleteConfirmation.classId,
              day: deleteConfirmation.day,
              timeSlot: deleteConfirmation.time,
            }),
          }
        );
        const { success } = await response.json();
        if (success) {
          setClasses((prevClasses) =>
            prevClasses.map((cls) =>
              cls.classId === deleteConfirmation.classId
                ? {
                    ...cls,
                    timetable: {
                      ...cls.timetable,
                      [deleteConfirmation.day]: cls.timetable[
                        deleteConfirmation.day
                      ].filter((slot) => slot.time !== deleteConfirmation.time),
                    },
                  }
                : cls
            )
          );
        } else {
          console.error("Failed to delete slot:", await response.json());
        }
      }
      setDeleteConfirmation(null);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <Head>
        <title>Admin Timetable</title>
        <meta name="description" content="Admin Timetable Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

  <main className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-800 flex items-center gap-2">
              <FaChalkboardTeacher className="inline-block text-indigo-600" />
              Admin Timetable Management
            </h1>
            <p className="text-gray-500 mt-1">Easily manage, view, and edit class timetables for your school.</p>
          </div>
          <button
            onClick={() => setCreatingClass(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            title="Create New Class"
          >
            <FaPlus /> Create New Class
          </button>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-gray-500">Loading classes...</span>
          </div>
        ) : classes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaBook className="text-5xl text-indigo-200 mb-4" />
            <span className="text-gray-400 text-lg">No classes found. Click "Create New Class" to get started!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.classId}
                className="bg-white rounded-xl shadow-lg p-6 relative transition hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-indigo-700 mb-1 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-indigo-400" />
                  {cls.className ? `${cls.className}` : `Class ${cls.classId}`}
                </h2>
                <p className="text-gray-500 text-sm mb-2">ID: {cls.classId}</p>
                <div className="flex justify-end space-x-2 absolute top-4 right-4">
                  <button
                    onClick={() => handleViewClass(cls.classId)}
                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 text-sm shadow"
                    title="View Timetable"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEditClass(cls.classId, cls.timetable, cls.schoolDays)}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm shadow"
                    title="Edit Timetable"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClass(cls.classId)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 text-sm shadow"
                    title="Delete Class"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  <FaBook className="inline-block mr-1 text-indigo-300" />
                  Subjects: {[
                    ...new Set(
                      Object.values(cls.timetable)
                        .flat()
                        .map((slot) => slot.subject)
                    ),
                  ]
                    .filter(Boolean)
                    .join(", ") || <span className="text-gray-400">None</span>}
                </p>
                <p className="text-gray-600">
                  <FaDoorOpen className="inline-block mr-1 text-indigo-300" />
                  Total Slots: {Object.values(cls.timetable).flat().length}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* View Timetable Modal */}
        {viewClass && (
          <div className="text-black fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                Timetable for Class {viewClass.classId}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-indigo-100">
                      <th className="p-4 text-left text-indigo-700 font-semibold sticky left-0 bg-indigo-100">Time</th>
                      {viewClass.timetable &&
                        Object.keys(viewClass.timetable).map((day) => (
                          <th
                            key={day}
                            className={`p-4 text-center text-indigo-700 font-semibold ${day === currentDay ? "bg-indigo-200" : ""}`}
                          >
                            {day}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}>
                        <td className="p-4 text-gray-700 font-medium sticky left-0 bg-white">
                          {time}
                        </td>
                        {viewClass.timetable &&
                          Object.keys(viewClass.timetable).map((day) => {
                            const slot = viewClass.timetable[day].find((slot) => slot.time === time);
                            return (
                              <td
                                key={`${day}-${time}`}
                                className={`p-4 text-center align-top ${day === currentDay ? "bg-indigo-50" : "bg-white"}`}
                              >
                                {slot ? (
                                  <div className="space-y-1">
                                    <span className="flex items-center gap-1 text-gray-800 font-medium">
                                      <FaBook className="text-indigo-400" /> {slot.subject}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-500">
                                      <FaChalkboardTeacher className="text-indigo-300" /> {slot.teacher}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-500">
                                      <FaDoorOpen className="text-indigo-300" /> {slot.room}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">Free</span>
                                )}
                              </td>
                            );
                          })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setViewClass(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Timetable Modal */}
        {editingClass && (
          <div className="text-black fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                Edit Timetable for Class {editingClass}
              </h3>
              <form onSubmit={handleUpdate} className="space-y-6">
                {classes
                  .find((cls) => cls.classId === editingClass)
                  ?.schoolDays.map((day) => (
                    <div key={day} className="border-b pb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-3">
                        {day}
                      </h4>
                      {timeSlots.map((time) => (
                        <div
                          key={`${day}-${time}`}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3"
                        >
                          <div>
                            <label className="block text-gray-600 text-sm">
                              {time}
                            </label>
                          </div>
                          <div>
                            <label className="block text-gray-600 text-sm">
                              Subject
                            </label>
                            <input
                              type="text"
                              value={formData[`${day}-${time}`]?.subject || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  day,
                                  time,
                                  "subject",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 text-sm">
                              Teacher
                            </label>
                            <input
                              type="text"
                              value={formData[`${day}-${time}`]?.teacher || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  day,
                                  time,
                                  "teacher",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 text-sm">
                              Room
                            </label>
                            <input
                              type="text"
                              value={formData[`${day}-${time}`]?.room || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  day,
                                  time,
                                  "room",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingClass(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save Timetable
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Class Modal */}
        {creatingClass && (
          <div className="text-black fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                Create New Class
              </h3>
              <form onSubmit={handleCreateClass} className="space-y-6">
                <div>
                  <label className="block text-gray-600 text-sm">
                    Class ID
                  </label>
                  <input
                    type="text"
                    value={createFormData.classId}
                    onChange={(e) =>
                      setCreateFormData({
                        ...createFormData,
                        classId: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={createFormData.className}
                    onChange={(e) =>
                      setCreateFormData({
                        ...createFormData,
                        className: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm">
                    School Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {possibleDays.map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={createFormData.schoolDays.includes(day)}
                          onChange={() => handleSchoolDaysChange(day)}
                          className="mr-2"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
                {createFormData.schoolDays.map((day) => (
                  <div key={day} className="border-b pb-4">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">
                      {day}
                    </h4>
                    {timeSlots.map((time) => (
                      <div
                        key={`${day}-${time}`}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3"
                      >
                        <div>
                          <label className="block text-gray-600 text-sm">
                            {time}
                          </label>
                        </div>
                        <div>
                          <label className="block text-gray-600 text-sm">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={
                              createFormData.timetable[day]?.[time]?.subject ||
                              ""
                            }
                            onChange={(e) =>
                              handleCreateInputChange(
                                day,
                                time,
                                "subject",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600 text-sm">
                            Teacher
                          </label>
                          <input
                            type="text"
                            value={
                              createFormData.timetable[day]?.[time]?.teacher ||
                              ""
                            }
                            onChange={(e) =>
                              handleCreateInputChange(
                                day,
                                time,
                                "teacher",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-600 text-sm">
                            Room
                          </label>
                          <input
                            type="text"
                            value={
                              createFormData.timetable[day]?.[time]?.room || ""
                            }
                            onChange={(e) =>
                              handleCreateInputChange(
                                day,
                                time,
                                "room",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setCreatingClass(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-4">
                {deleteConfirmation.type === "class"
                  ? `Are you sure you want to delete the timetable for Class ${deleteConfirmation.classId}?`
                  : `Are you sure you want to delete the timetable slot for ${
                      classes
                        .find(
                          (cls) => cls.classId === deleteConfirmation.classId
                        )
                        ?.timetable[deleteConfirmation.day]?.find(
                          (slot) => slot.time === deleteConfirmation.time
                        )?.subject || "this slot"
                    } on ${deleteConfirmation.day} at ${
                      deleteConfirmation.time
                    }?`}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}