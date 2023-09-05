import express from 'express';
import Teacher from '../Models/teacherSchema.js';
import Student from '../Models/studentSchema.js';

const router = express.Router();

router.get('/student', async (req, res) => {
  try
  {
    const details = await Student.find()
    if(!details){
      res.status(401).json({message : "Data not found"})
    }else{
  res.send(details)
    }
}catch(err){
  console.log(err)
}
} )

router.get('/teacher/:id', async (req, res) => {

  const id = req.params.id;

  try {
      const teacherDetails = await Student.find({teacherId : id})
      if(teacherDetails){
       res.send(teacherDetails)
      }
    
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Data' });
  }
});

router.post('/add-teacher', async (req, res) => {

  try{

  const {teacherName, teacherSubject, teacherId } = req.body;

const existingTeacher = await Teacher.findOne({teacherId : teacherId});
if(existingTeacher){
  res.status(400).json({message : "Teacher already exists"})
}else{              
          const teacherDetails = await Teacher({teacherName, teacherId});

          await teacherDetails.save();            
          
          res.status(201).json({message : "Teacher Added!", teacherDetails})
      
          }
         } catch(err){
      console.log(err)
  }
});

router.post('/add-student', async (req, res) => {

  try {

          const {studentName, studentDivision, studentRoll, studentPhoto} = req.body;
        
        const existingStudent = await Student.findOne({studentRoll, studentDivision});
        
        if(existingStudent){
          res.status(400).json({message : "Student already exists"})
        }else{ 
              
          const studentDetails = new Student({studentName, studentDivision, studentRoll, studentPhoto});

          await studentDetails.save();            
          
          res.status(201).json({message : "Student Added!", studentDetails})
      
        }
        } catch(err){
      console.log(err)
  }
});

router.post('/assign-teacher', async (req, res) => {
  const {teacherName, teacherId, studentName, studentDivision, studentRoll} = req.body;
  try {
    const teacherExists = await Teacher.findOne({teacherName : teacherName}&&{teacherId:teacherId});
    const studentExists = await Student.findOne({studentName : studentName}&&{studentDivision:studentDivision}&&{studentRoll:studentRoll});
    if(teacherExists !== null && studentExists !== null){
      const updatedDetails = await Student.updateOne(({studentRoll : `${studentRoll}`} && {studentDivision : `${studentDivision}`} ), {$set: {teacherName : teacherName, teacherId : teacherId}}, {new : true});          
          
     if(updatedDetails){res.status(201).json({message : "Teacher Assigned!", updatedDetails})}
  }else{
      console.log("Kindly Check the details again!")
    }
  } catch (error) {
    console.log(error)
  }
});

router.put('/update-teacher', async (req, res) => {
  const {teacherName, teacherId, studentDivision, studentRoll} = req.body;
  try {
    const teacherExists = await Teacher.findOne({teacherId:teacherId});
    const studentExists = await Student.findOne({studentDivision:studentDivision}&&{studentRoll:studentRoll});
    if(teacherExists !== null && studentExists !== null){
      const updatedDetails = await Student.updateOne(({studentRoll : `${studentRoll}`} && {studentDivision : `${studentDivision}`} ), {$set: {teacherName : teacherName, teacherId : teacherId}}, {new : true});          
          
     if(updatedDetails){res.status(201).json({message : "Teacher Updated!", updatedDetails})}
  }else{
      console.log("Kindly Check the details again!")
    }
  } catch (error) {
    console.log(error)
  }
});

router.delete('/delete-teacher', async (req, res) => {
  const {teacherName, teacherId} = req.body;
  try {
    const teacherExists = await Teacher.findOne({teacherId:teacherId});
    if(teacherExists){
      const deleteTeacher = await Student.deleteOne({teacherName : teacherName, teacherId : teacherId});          
          
     if(deleteTeacher){res.status(201).json({message : "Teacher data deleted!", deleteTeacher})}
  }else{
      console.log("Kindly Check the details again!")
    }
  } catch (error) {
    console.log(error)
  }
});

router.delete('/delete-student', async (req, res) => {
  const {teacherName, teacherId} = req.body;
  try {
    const studentExists = await Student.findOne({studentDivision:studentDivision}&&{studentRoll:studentRoll});
    if(studentExists){
      const deleteStudent = await Student.deleteOne({studentDivision:studentDivision, studentRoll:studentRoll});          
          
     if(deleteStudent){res.status(201).json({message : "Student data deleted!", deleteStudent})}
  }else{
      console.log("Kindly Check the details again!")
    }
  } catch (error) {
    console.log(error)
  }
});

export default router;