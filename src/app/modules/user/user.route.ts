import { Router } from "express";
import validRequestHandler from "../../utils/validRequestHandler";
import ZCreateStudentValidationSchema from "../student/student.validation";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create-student",
  validRequestHandler(ZCreateStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRouters = router;
