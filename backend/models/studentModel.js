const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  status: { type: String, enum: ["Present", "Absent"], default: "Present" },
});

const studentSchema = mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String }, // Path to the uploaded image
    attendance: [attendanceSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", studentSchema);
