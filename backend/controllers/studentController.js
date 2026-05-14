const Student = require("../models/studentModel");

// @desc    Register a new student with Image
const registerStudent = async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    const profileImage = req.file ? req.file.path : "";

    const studentExists = await Student.findOne({ studentId });
    if (studentExists)
      return res.status(400).json({ message: "Student already exists" });

    const student = await Student.create({
      studentId,
      name,
      email,
      profileImage,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students
const getStudents = async (req, res) => {
  const students = await Student.find({});
  res.json(students);
};

// @desc    Update student details
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
};

// @desc    Delete student
const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json({ message: "Student removed" });
};

// @desc    Mark/Update attendance
const markAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  const student = await Student.findOne({ studentId });

  if (student) {
    // Check if attendance for this date already exists
    const existingDate = student.attendance.find((a) => a.date === date);
    if (existingDate) {
      existingDate.status = status;
    } else {
      student.attendance.push({ date, status });
    }
    await student.save();
    res.json({ message: "Attendance updated" });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

module.exports = {
  registerStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  markAttendance,
};
