import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.delete("/:id", AdminControllers.deleteAdmin);

export const AdminRouters = router;
