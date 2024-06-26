import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { semesterNameAndCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const getAcademicSemester = async (semesterId: Types.ObjectId) => {
  const semester = await AcademicSemesterModel.findById(semesterId);
  return semester;
};

const getAllAcademicSemester = async () => {
  const semesters = await AcademicSemesterModel.find();
  return semesters;
};

const createAcademicSemester = async (payload: IAcademicSemester) => {
  if (semesterNameAndCodeMapper[payload.name] !== payload.code)
    throw new AppError(400, "Semester Name and Code Invalid!");

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const updateAcademicSemester = async (
  semesterId: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    semesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(400, "Semester Name and Code Invalid!");
  }

  const updatedSemester = await AcademicSemesterModel.findByIdAndUpdate(
    semesterId,
    payload,
    { new: true }
  );

  return updatedSemester;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAcademicSemester,
  getAllAcademicSemester,
  updateAcademicSemester,
};
