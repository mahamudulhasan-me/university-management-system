import { Router } from "express";

import auth from "../../middlewares/auth";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { USER_ROLE } from "../user/user.constant";
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

router.get("/", auth(USER_ROLE.admin), getAllAcademicSemester);
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
