import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { FacultyModel } from "../academicFaculty/academicFaculty.model";
import { IDepartment } from "./department.interface";

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

departmentSchema.pre("save", async function (next) {
  const isDepExit = await DepartmentModel.findOne({ name: this.name });

  if (isDepExit) throw new AppError(409, "This department is already exit!");

  next();
});

departmentSchema.pre("findOneAndUpdate", async function (next) {
  const requestedDep = this.getQuery();
  const isDepExit = await FacultyModel.findOne(requestedDep);
  if (!isDepExit) throw new AppError(404, "This faculty not exit!");
  next();
});

export const DepartmentModel = model<IDepartment>(
  "Department",
  departmentSchema
);
