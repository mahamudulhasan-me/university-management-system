import { Router } from "express";
import validRequestHandler from "../../utils/validRequestHandler";
import { StudentControllers } from "./student.controller";
import { ZodUpdateStudentValidationSchema } from "./student.validation";

const router = Router();

router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getStudentById);
router.delete("/:id", StudentControllers.deleteStudentById);
router.patch(
  "/:id",
  validRequestHandler(ZodUpdateStudentValidationSchema),
  StudentControllers.updateStudent
);

export const StudentRouters = router;
