import AppError from "../../errors/AppError";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { IDepartment } from "./department.interface";
import { DepartmentModel } from "./department.model";

const createDepartment = async (payload: IDepartment) => {
  const isFacultyExit = await AcademicFacultyModel.findById(
    payload.academicFaculty
  );
  if (!isFacultyExit) throw new AppError(404, "This Faculty not exit");

  const createdDepartment = await DepartmentModel.create(payload);
  return createdDepartment;
};

const getAllDepartments = async () => {
  const departments = await DepartmentModel.find()
    .populate("academicFaculty")
    .exec();
  return departments;
};

const getDepartmentById = async (departmentId: string) => {
  const department = await DepartmentModel.findById(departmentId).populate(
    "academicFaculty"
  );
  return department;
};

const updateDepartment = async (
  departmentId: string,
  payload: Partial<IDepartment>
) => {
  const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
    departmentId,
    payload,
    { new: true }
  );
  return updatedDepartment;
};

export const DepartmentServices = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
};
