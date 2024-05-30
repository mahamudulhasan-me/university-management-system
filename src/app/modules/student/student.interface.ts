import { Types } from "mongoose";

export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
export interface IAddress {
  address: string;
  postOffice: string;
  thana: string;
  district: string;
  postalCode?: number;
}
export interface IGuardian {
  fatherName: IName;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: IName;
  motherOccupation: string;
  motherContactNumber: string;
}
export interface ILocalGuardian {
  name: IName;
  occupation: string;
  contactNumber: string;
  address?: string;
}
export interface IStudent {
  id: string;
  userId: Types.ObjectId;
  name: IName;
  gender: "male" | "female";
  dateOfBirth: Date;
  email: string;
  contactNumber: string;
  permanentAddress: IAddress;
  presentAddress: IAddress;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  profileImage?: string;
}
