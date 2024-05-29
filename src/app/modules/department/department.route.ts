import { Router } from "express";
import validRequestHandler from "../../utils/validRequestHandler";
import { DepartmentControllers } from "./department.controller";
import {
  ZodCreateDepartmentValidationSchema,
  ZodUpdateDepartmentValidationSchema,
} from "./department.validation";

const router = Router();

router.get("/", DepartmentControllers.getAllDepartments);
router.get("/:departmentId", DepartmentControllers.getDepartmentById);

router.post(
  "/create-department",
  validRequestHandler(ZodCreateDepartmentValidationSchema),
  DepartmentControllers.createDepartment
);

router.patch(
  "/:departmentId",
  validRequestHandler(ZodUpdateDepartmentValidationSchema),
  DepartmentControllers.updateDepartment
);

export const DepartmentRouters = router;
