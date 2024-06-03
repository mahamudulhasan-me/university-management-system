import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const createdFaculty = await AcademicFacultyModel.create(payload);
  return createdFaculty;
};

const getAcademicFacultyById = async (facultyId: string) => {
  const faculty = await AcademicFacultyModel.findById(facultyId);
  return faculty;
};

const getAllAcademicFaculty = async () => {
  const faculties = await AcademicFacultyModel.find();
  return faculties;
};

const updateAcademicFaculty = async (
  facultyId: string,
  payload: IAcademicFaculty
) => {
  const updatedFaculty = await AcademicFacultyModel.findByIdAndUpdate(
    facultyId,
    payload,
    { new: true }
  );
  return updatedFaculty;
};

export const AcademicFacultyServices = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFaculty,
};
