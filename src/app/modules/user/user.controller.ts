import httpStatus from "http-status";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = asyncHandler(async (req, res, next) => {
  const { password, student } = req.body;
  const createdStudent = await UserServices.createStudent(password, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Created Successfully!",
    data: createdStudent,
  });
});

const createAdmin = asyncHandler(async (req, res, next) => {
  const { password, admin } = req.body;
  const createdAdmin = await UserServices.createAdmin(password, admin);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin Created Successfully!",
    data: createdAdmin,
  });
});

export const UserControllers = {
  createStudent,
  createAdmin,
};
