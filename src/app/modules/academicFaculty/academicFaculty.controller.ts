import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = asyncHandler(async (req, res, nex) => {
  const createdAcademicFaculty =
    await AcademicFacultyServices.createAcademicFaculty(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic Faculty Created Successfully!",
    data: createdAcademicFaculty,
  });
});

const getAcademicFacultyById = asyncHandler(async (req, res, next) => {
  const { facultyId } = req.params;
  const academicFaculty = await AcademicFacultyServices.getAcademicFacultyById(
    facultyId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty fetched successfully!",
    data: academicFaculty,
  });
});

const getAllAcademicFaculty = asyncHandler(async (req, res, next) => {
  const academicFaculties =
    await AcademicFacultyServices.getAllAcademicFaculty();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculties fetched successfully!",
    data: academicFaculties,
  });
});

const updateAcademicFaculty = asyncHandler(async (req, res, next) => {
  const { facultyId } = req.params;
  const updatedAcademicFaculty =
    await AcademicFacultyServices.updateAcademicFaculty(facultyId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty updated successfully!",
    data: updatedAcademicFaculty,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFacultyById,
  getAllAcademicFaculty,
  updateAcademicFaculty,
};
