import mongoose from "mongoose";

const teacherData = new mongoose.Schema({
  teacherName : String,
  teacherSubject : String,
  teacherId : Number
});

const Teacher = mongoose.model("TEACHER", teacherData);

export default Teacher;
