import { Router } from "express";

import validRequestHandler from "../../middlewares/validRequestHandler";
import { ZodCreateAdminValidationSchema } from "../admin/admin.validation";
import { ZodCreateFacultyValidationSchema } from "../faculty/faculty.validation";
import { ZodCreateStudentValidationSchema } from "../student/student.validation";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create-student",
  validRequestHandler(ZodCreateStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-admin",
  validRequestHandler(ZodCreateAdminValidationSchema),
  UserControllers.createAdmin
);

router.post(
  "/create-faculty",
  validRequestHandler(ZodCreateFacultyValidationSchema),
  UserControllers.createFaculty
);

export const UserRouters = router;
