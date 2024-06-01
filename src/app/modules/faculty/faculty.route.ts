import { Router } from "express";

import validRequestHandler from "../../middlewares/validRequestHandler";
import { FacultyControllers } from "./faculty.controller";
import { ZodFacultyValidationSchema } from "./faculty.validation";

const router = Router();

router.get("/", FacultyControllers.getAllFaculty);
router.get("/:facultyId", FacultyControllers.getFacultyById);
router.post(
  "/create-faculty",
  validRequestHandler(ZodFacultyValidationSchema),
  FacultyControllers.createFaculty
);

router.patch(
  "/:facultyId",
  validRequestHandler(ZodFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

export const FacultyRouters = router;
