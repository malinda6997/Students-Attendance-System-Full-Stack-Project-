const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  registerStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  markAttendance,
} = require("../controllers/studentController");

router.post("/", upload.single("image"), registerStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/attendance", markAttendance);

module.exports = router;
