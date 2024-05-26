import { Router } from "express";
import validRequestHandler from "../../utils/validRequestHandler";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import ZodCreateAcademicSemesterValidationSchema from "./academicSemester.validation";

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

router.patch("/:semesterId", updatedAcademicSemester);

export const AcademicSemesterRouters = router;
