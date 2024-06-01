import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
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

const deleteStudentById = async (studentId: string) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const isStudentExit = await StudentModel.findOne({ id: studentId });
    if (!isStudentExit) throw new AppError(404, "This student not exit!");

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) throw new AppError(400, "Failed to delete student!");

    const deletedUser = await UserModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) throw new AppError(400, "Failed to delete user");

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const {
    name,
    presentAddress,
    permanentAddress,
    guardian,
    localGuardian,
    ...remainingStudentInfo
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentInfo,
  };
  const updateNestedFields = (object: any, prefix: string) => {
    if (object && Object.keys(object).length) {
      for (const [key, value] of Object.entries(object)) {
        modifiedUpdatedData[`${prefix}.${key}`] = value;
      }
    }
  };

  updateNestedFields(name, "name");
  updateNestedFields(presentAddress, "presentAddress");
  updateNestedFields(permanentAddress, "permanentAddress");
  updateNestedFields(guardian, "guardian");
  updateNestedFields(localGuardian, "localGuardian");

  // if (presentAddress && Object.keys(presentAddress)) {
  //   for (const [key, value] of Object.entries(presentAddress)) {
  //     modifiedUpdatedData[`presentAddress.${key}`] = value;
  //   }
  // }
  // if (permanentAddress && Object.keys(permanentAddress)) {
  //   for (const [key, value] of Object.entries(permanentAddress)) {
  //     modifiedUpdatedData[`permanentAddress.${key}`] = value;
  //   }
  // }
  // if (guardian && Object.keys(guardian)) {
  //   for (const [key, value] of Object.entries(guardian)) {
  //     modifiedUpdatedData[`guardian.${key}`] = value;
  //   }
  // }
  // if (localGuardian && Object.keys(localGuardian)) {
  //   for (const [key, value] of Object.entries(localGuardian)) {
  //     modifiedUpdatedData[`localGuardian.${key}`] = value;
  //   }
  // }

  const updatedStudent = await StudentModel.findOneAndUpdate(
    {
      id,
    },
    modifiedUpdatedData,
    { new: true }
  );

  return updatedStudent;
};

export const StudentServices = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudent,
};
