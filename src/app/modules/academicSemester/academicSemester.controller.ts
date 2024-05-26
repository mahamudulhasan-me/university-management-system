import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

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

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
