import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student } = req.body;
    const createdStudent = await UserServices.createStudent(password, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student Created Successfully!",
      data: createdStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
