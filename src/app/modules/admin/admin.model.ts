import { Schema, model } from "mongoose";
import { addressSchema, nameSchema } from "../student/student.model";
import { IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: nameSchema,
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
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminModel = model<IAdmin>("Admin", adminSchema);
