import config from "../../config";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudent = async (password: string, studentInfo: IStudent) => {
  const id = "CSE-92116502";
  const userInfo: Partial<IUser> = {};

  userInfo.password = password || (config.default_password as string);
  userInfo.role = "student";
  userInfo.id = id;

  const createdUser = await UserModel.create(userInfo);

  if (Object.keys(createdUser).length) {
    studentInfo.id = createdUser.id;
    studentInfo.userId = createdUser._id;

    const createdStudent = StudentModel.create(studentInfo);
    return createdStudent;
  }
};

export const UserServices = { createStudent };
