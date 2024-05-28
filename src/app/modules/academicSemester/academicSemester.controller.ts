import httpStatus from "http-status";
import { Types } from "mongoose";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const getAllAcademicSemester = asyncHandler(async (req, res, next) => {
  const semesters = await AcademicSemesterServices.getAllAcademicSemester();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All academic semester fetched successfully!",
    data: semesters,
  });
});

const getAcademicSemester = asyncHandler(async (req, res, next) => {
  const semesterId = new Types.ObjectId(req.params.semesterId);

  const result = await AcademicSemesterServices.getAcademicSemester(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Academic semester fetched successfully!`,

    data: result,
  });
});

const createAcademicSemester = asyncHandler(async (req, res, next) => {
  const createdSemester = await AcademicSemesterServices.createAcademicSemester(
    req.body
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic Semester Created Successfully!",
    data: createdSemester,
  });
});

const updatedAcademicSemester = asyncHandler(async (req, res, next) => {
  const semesterId = req.params.semesterId;
  const semesterInfo = req.body;

  const updatedSemester = await AcademicSemesterServices.updateAcademicSemester(
    semesterId,
    semesterInfo
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Updated Successfully!",
    data: updatedSemester,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  getAllAcademicSemester,
  updatedAcademicSemester,
};
