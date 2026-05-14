import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
  });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("studentId", formData.studentId);
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (image) data.append("image", image);

    try {
      await API.post("/students", data);
      toast.success("Student added successfully!");
      setFormData({ studentId: "", name: "", email: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding student");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Register New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student ID"
          className="w-full p-3 border rounded-lg"
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="file"
          className="w-full p-2"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
