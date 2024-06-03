import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { IAcademicFaculty } from "./academicFaculty.interface";

export const academicFacultySchema = new Schema<IAcademicFaculty>(
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

academicFacultySchema.pre("save", async function (next) {
  const isFacultyExit = await AcademicFacultyModel.findOne({ name: this.name });

  if (isFacultyExit) throw new AppError(409, "This faculty already exit!");

  next();
});

export const AcademicFacultyModel = model<IAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
