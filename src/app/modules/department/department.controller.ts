import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { DepartmentServices } from "./department.service";

const createDepartment = asyncHandler(async (req, res, next) => {
  const createdDepartment = await DepartmentServices.createDepartment(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic department created successfully!",
    data: createdDepartment,
  });
});

const getDepartmentById = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;
  const department = await DepartmentServices.getDepartmentById(departmentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic department fetched successfully!",
    data: department,
  });
});

const getAllDepartments = asyncHandler(async (req, res, next) => {
  const departments = await DepartmentServices.getAllDepartments();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic departments fetched successfully!",
    data: departments,
  });
});

const updateDepartment = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;
  const updatedDepartment = await DepartmentServices.updateDepartment(
    departmentId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic department updated successfully!",
    data: updatedDepartment,
  });
});

export const DepartmentControllers = {
  createDepartment,
  getDepartmentById,
  getAllDepartments,
  updateDepartment,
};
