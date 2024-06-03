import { Router } from "express";

import validRequestHandler from "../../middlewares/validRequestHandler";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { ZodAcademicFacultyValidationSchema } from "./academicFaculty.validation";

const router = Router();

router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);
router.get("/:facultyId", AcademicFacultyControllers.getAcademicFacultyById);
router.post(
  "/create-faculty",
  validRequestHandler(ZodAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty
);

router.patch(
  "/:facultyId",
  validRequestHandler(ZodAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyControllersFacultyRouters = router;
