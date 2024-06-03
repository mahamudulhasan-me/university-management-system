import { Router } from "express";

import validRequestHandler from "../../middlewares/validRequestHandler";
import { ZodCreateAdminValidationSchema } from "../admin/admin.validation";
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

export const UserRouters = router;
