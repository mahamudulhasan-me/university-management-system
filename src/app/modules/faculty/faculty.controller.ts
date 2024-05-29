import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";

const createFaculty = asyncHandler(async (req, res, nex) => {
  const createdFaculty = await FacultyServices.createFaculty(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic Faculty Created Successfully!",
    data: createdFaculty,
  });
});

const getFacultyById = asyncHandler(async (req, res, next) => {
  const { facultyId } = req.params;
  const faculty = await FacultyServices.getFacultyById(facultyId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty fetched successfully!",
    data: faculty,
  });
});

const getAllFaculty = asyncHandler(async (req, res, next) => {
  const faculties = await FacultyServices.getAllFaculty();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculties fetched successfully!",
    data: faculties,
  });
});

const updateFaculty = asyncHandler(async (req, res, next) => {
  const { facultyId } = req.params;
  const updatedFaculty = await FacultyServices.updateFaculty(
    facultyId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty updated successfully!",
    data: updatedFaculty,
  });
});

export const FacultyControllers = {
  createFaculty,
  getFacultyById,
  getAllFaculty,
  updateFaculty,
};
