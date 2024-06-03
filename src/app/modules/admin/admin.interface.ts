import { Types } from "mongoose";
import { IAddress, IName } from "../student/student.interface";

export interface IAdmin {
  id: string;
  userId: Types.ObjectId;
  designation: string;
  name: IName;
  gender: "Male" | "Female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  permanentAddress: IAddress;
  presentAddress: IAddress;
  profileImage: string;
  managementDepartment: Types.ObjectId;
}
