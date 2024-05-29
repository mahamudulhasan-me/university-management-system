import { IFaculty } from "./faculty.interface";
import { FacultyModel } from "./faculty.model";

const createFaculty = async (payload: IFaculty) => {
  const createdFaculty = await FacultyModel.create(payload);
  return createdFaculty;
};

const getFacultyById = async (facultyId: string) => {
  const faculty = await FacultyModel.findById(facultyId);
  return faculty;
};

const getAllFaculty = async () => {
  const faculties = await FacultyModel.find();
  return faculties;
};

const updateFaculty = async (facultyId: string, payload: IFaculty) => {
  const updatedFaculty = await FacultyModel.findByIdAndUpdate(
    facultyId,
    payload,
    { new: true }
  );
  return updatedFaculty;
};

export const FacultyServices = {
  createFaculty,
  getFacultyById,
  getAllFaculty,
  updateFaculty,
};
