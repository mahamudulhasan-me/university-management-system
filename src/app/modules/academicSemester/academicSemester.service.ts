import { semesterNameAndCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemester = async (payload: IAcademicSemester) => {
  if (semesterNameAndCodeMapper[payload.name] !== payload.code)
    throw new Error("Semester Name and Code Invalid!");

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
};
