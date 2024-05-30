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

export const StudentControllers = {
  getAllStudents,
  getStudentById
};
