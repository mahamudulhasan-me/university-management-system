import { Router } from "express";
import validRequestHandler from "../../utils/validRequestHandler";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import ZodCreateAcademicSemesterValidationSchema from "./academicSemester.validation";

const router = Router();

router.post(
  "/",
  validRequestHandler(ZodCreateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester
);

export const AcademicSemesterRouters = router;
