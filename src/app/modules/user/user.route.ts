import { Router } from "express";

import validRequestHandler from "../../middlewares/validRequestHandler";

import { ZodCreateStudentValidationSchema } from "../student/student.validation";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create-student",
  validRequestHandler(ZodCreateStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRouters = router;
