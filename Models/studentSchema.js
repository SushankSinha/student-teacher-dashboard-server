import mongoose from "mongoose";

const studentData = new mongoose.Schema({
  studentName: String,
  studentDivision: Number,
  studentRoll: Number,
  studentPhoto : String,
  teacherName: {
    type: String,
    default : ""
  },
  teacherId: {
    type: Number,
    default : null
  }
});

const Student = mongoose.model("STUDENT_DATA", studentData);

export default Student;
