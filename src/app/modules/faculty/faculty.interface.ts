import { Types } from "mongoose";
import { IAddress, IName } from "../student/student.interface";

export interface IFaculty {
  id: string;
  userId: Types.ObjectId;
  name: IName;
  designation: string;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  permanentAddress: IAddress;
  presentAddress: IAddress;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
}
