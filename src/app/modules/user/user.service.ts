import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudent = async (password: string, studentInfo: IStudent) => {
  const userInfo: Partial<IUser> = {};
  const admissionSemester = await AcademicSemesterModel.findById(
    studentInfo.admissionSemester
  );
  if (!admissionSemester) {
    throw new Error("Admission semester not found");
  }
  userInfo.password = password || (config.default_password as string);
  userInfo.role = "student";
  userInfo.id = await generateStudentId(admissionSemester);
  const createdUser = await UserModel.create(userInfo);

  if (Object.keys(createdUser).length) {
    studentInfo.id = createdUser.id;
    studentInfo.userId = createdUser._id;
    const createdStudent = StudentModel.create(studentInfo);
    return createdStudent;
  }
};

export const UserServices = { createStudent };
