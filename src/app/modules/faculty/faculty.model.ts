import { Schema, model } from "mongoose";
import { IFaculty } from "./faculty.interface";

export const facultySchema = new Schema<IFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FacultyModel = model<IFaculty>("Faculty", facultySchema);
