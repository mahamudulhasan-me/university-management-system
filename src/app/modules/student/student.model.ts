import { Schema, model } from "mongoose";
import {
  IAddress,
  IGuardian,
  ILocalGuardian,
  IName,
  IStudent,
  TBloodGroup,
} from "./student.interface";

export const BloodGroup: TBloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];
export const nameSchema = new Schema<IName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

export const addressSchema = new Schema<IAddress>({
  address: { type: String, required: true },
  postOffice: { type: String, required: true },
  thana: { type: String, required: true },
  district: { type: String, required: true },
  postalCode: { type: Number },
});

export const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: nameSchema, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNumber: { type: String, required: true },
  motherName: nameSchema,
  motherOccupation: { type: String, required: true },
  motherContactNumber: { type: String, required: true },
});

export const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: nameSchema, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String },
});

export const studentSchema = new Schema<IStudent>({
  id: { type: String, required: true, unique: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: { type: nameSchema, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  bloodGroup: { type: String, enum: BloodGroup },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  permanentAddress: { type: addressSchema, required: true },
  presentAddress: { type: addressSchema, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicSemester",
  },
  profileImage: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
export const StudentModel = model<IStudent>("Student", studentSchema);
