import { Schema, model } from "mongoose";
import {
  months,
  semesterCode,
  semesterName,
} from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterName,
      required: true,
    },
    code: {
      type: String,
      enum: semesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExist) {
    throw new Error(`In The Year ${this.year}, ${this.name} Already Exist!`);
  }
  next();
});

export const AcademicSemesterModel = model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
