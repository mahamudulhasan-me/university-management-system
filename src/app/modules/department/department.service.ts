import { IDepartment } from "./department.interface";
import { DepartmentModel } from "./department.model";

const createDepartment = async (payload: IDepartment) => {
  const createdDepartment = await DepartmentModel.create(payload);
  return createdDepartment;
};

const getAllDepartments = async () => {
  const departments = await DepartmentModel.find();
  return departments;
};

const getDepartmentById = async (departmentId: string) => {
  const department = await DepartmentModel.findById(departmentId);
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
