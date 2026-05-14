import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await API.get("/students");
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handleMark = async (studentId, status) => {
    try {
      await API.post("/students/attendance", { studentId, date, status });
      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error("Failed to mark attendance");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Mark Attendance</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-lg"
        />
      </div>
      <div className="space-y-3">
        {students.map((s) => (
          <div
            key={s._id}
            className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50"
          >
            <span>
              {s.name} ({s.studentId})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleMark(s.studentId, "Present")}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200"
              >
                Present
              </button>
              <button
                onClick={() => handleMark(s.studentId, "Absent")}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
