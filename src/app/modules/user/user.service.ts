import { startSession } from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { DepartmentModel } from "../department/department.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudent = async (password: string, studentInfo: IStudent) => {
  const userInfo: Partial<IUser> = {};

  const session = await startSession();

  try {
    session.startTransaction();
    const admissionSemester = await AcademicSemesterModel.findById(
      studentInfo.admissionSemester
    );
    const isDepExit = await DepartmentModel.findById(
      studentInfo.academicDepartment
    );

    if (!isDepExit) throw new AppError(404, "Department not found");
    if (!admissionSemester)
      throw new AppError(404, "Admission semester not found");

    userInfo.password = password || (config.default_password as string);
    userInfo.role = "student";
    userInfo.id = await generateStudentId(admissionSemester);

    // create a user -(transaction-1)
    const createdUser = await UserModel.create([userInfo], { session });
    if (!createdUser.length) {
      throw new AppError(400, "Failed to create user");
    }
    studentInfo.id = createdUser[0].id;
    studentInfo.userId = createdUser[0]._id;

    // create a student (transaction-2)
    const createdStudent = await StudentModel.create([studentInfo], {
      session,
    });

    if (!createdStudent.length) {
      throw new AppError(400, "Failed to created student");
    }
    await session.commitTransaction();
    await session.endSession();

    return createdStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const UserServices = { createStudent };
