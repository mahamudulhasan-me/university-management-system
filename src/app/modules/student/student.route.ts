import { Router } from "express";
import { StudentControllers } from "./student.controller";

const router = Router();

router.get("/:studentId", StudentControllers.getStudentById);
router.get("/", StudentControllers.getAllStudents);

export const StudentRouters = router;
