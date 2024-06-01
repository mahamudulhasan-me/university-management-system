import { Router } from "express";

import validRequestHandler from "../../middlewares/validRequestHandler";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import {
  ZodCreateAcademicSemesterValidationSchema,
  ZodUpdateAcademicSemesterValidationSchema,
} from "./academicSemester.validation";

const {
  getAcademicSemester,
  createAcademicSemester,
  getAllAcademicSemester,
  updatedAcademicSemester,
} = AcademicSemesterControllers;

const router = Router();

router.get("/", getAllAcademicSemester);
router.get("/:semesterId", getAcademicSemester);
router.post(
  "/",
  validRequestHandler(ZodCreateAcademicSemesterValidationSchema),
  createAcademicSemester
);

router.patch(
  "/:semesterId",
  validRequestHandler(ZodUpdateAcademicSemesterValidationSchema),
  updatedAcademicSemester
);

export const AcademicSemesterRouters = router;
