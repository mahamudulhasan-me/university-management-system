import { IStudent } from "./student.interface";
import { StudentModel } from "./student.model";

const getAllStudents = async (): Promise<IStudent[]> => {
  const students = await StudentModel.find()
    .populate("userId")
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    })
    .exec();
  return students;
};

const getStudentById = async (studentId: string): Promise<IStudent | null> => {
  const student = await StudentModel.findById(studentId)
    .populate("userId")
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    })
    .exec();

  return student;
};

export const StudentServices = {
  getAllStudents,
  getStudentById,
};
