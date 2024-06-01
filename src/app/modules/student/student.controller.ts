import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

const getAllStudents = asyncHandler(async (req, res, next) => {
  const students = await StudentServices.getAllStudents();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All students fetched successfully!",
    data: students,
  });
});

const getStudentById = asyncHandler(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await StudentServices.getStudentById(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student fetched successfully!",
    data: student,
  });
});

const deleteStudentById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedStudent = await StudentServices.deleteStudentById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student deleted successfully!",
    data: deletedStudent,
  });
});

const updateStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { student } = req.body;

  const updatedStudent = await StudentServices.updateStudent(id, student);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student updated successfully!",
    data: updatedStudent,
  });
});

export const StudentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudent,
};
