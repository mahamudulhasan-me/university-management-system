import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { IFaculty } from "./academicFaculty.interface";

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

facultySchema.pre("save", async function (next) {
  const isFacultyExit = await FacultyModel.findOne({ name: this.name });

  if (isFacultyExit) throw new AppError(409, "This faculty already exit!");

  next();
});

export const FacultyModel = model<IFaculty>("Faculty", facultySchema);
