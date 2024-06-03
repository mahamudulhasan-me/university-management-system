import { Schema, model } from "mongoose";
import { addressSchema, nameSchema } from "../student/student.model";
import { IFaculty } from "./faculty.interface";

const facultySchema = new Schema<IFaculty>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: nameSchema,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: addressSchema,
    required: true,
  },
  presentAddress: {
    type: addressSchema,
    required: true,
  },
  profileImage: {
    type: String,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const FacultyModel = model<IFaculty>("Faculty", facultySchema);
