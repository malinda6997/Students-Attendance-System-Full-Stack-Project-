import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // Get all students from backend
  const fetchStudents = useCallback(async () => {
    try {
      const { data } = await API.get("/students");
      setStudents(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load students");
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Delete student logic
  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await API.delete(`/students/${id}`);
        toast.success("Student deleted successfully");
        fetchStudents(); // Refresh list after deletion
      } catch (error) {
        toast.error("Error deleting student");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Manage Students
        </h2>
        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          Total: {students.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 uppercase text-xs tracking-wider">
              <th className="pb-4 font-semibold">Image</th>
              <th className="pb-4 font-semibold">Student ID</th>
              <th className="pb-4 font-semibold">Name</th>
              <th className="pb-4 font-semibold">Email</th>
              <th className="pb-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4">
                    <img
                      src={`http://localhost:5000/${student.profileImage}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      alt={student.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150"; // Fallback image if original fails
                      }}
                    />
                  </td>
                  <td className="py-4 font-medium text-slate-700">
                    {student.studentId}
                  </td>
                  <td className="py-4 text-slate-600">{student.name}</td>
                  <td className="py-4 text-slate-600">{student.email}</td>
                  <td className="py-4 text-right space-x-2">
                    <button
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Student"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Student"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">
                  No students found. Add a student to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
