import { ClientSession, startSession } from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { IAdmin } from "../admin/admin.interface";
import { AdminModel } from "../admin/admin.model";
import { DepartmentModel } from "../department/department.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateAdminId, generateStudentId } from "./user.utils";

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

    return createdStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const createAdmin = async (password: string, payload: IAdmin) => {
  const userInfo: Partial<IUser> = {};

  const session: ClientSession = await startSession();

  try {
    session.startTransaction();

    userInfo.password = password || config.default_password;
    userInfo.role = "admin";
    userInfo.id = await generateAdminId();

    const createdUsers = await UserModel.create([userInfo], { session });

    if (!createdUsers.length) {
      throw new AppError(400, "Failed to create user!");
    }
    const createdUser = createdUsers[0];
    payload.id = createdUser.id;
    payload.userId = createdUser._id;

    const createdAdmin = await AdminModel.create([payload], { session });

    if (!createdAdmin.length) {
      throw new AppError(400, "Failed to create admin");
    }

    await session.commitTransaction();
    return createdAdmin;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const UserServices = { createStudent, createAdmin };
