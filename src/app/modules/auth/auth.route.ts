import { Router } from "express";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { AuthControllers } from "./auth.controller";
import { ZodUserLoginValidationSchema } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validRequestHandler(ZodUserLoginValidationSchema),
  AuthControllers.loginUser
);

router.post("/change-password", AuthControllers.changePassword);
export const AuthRouters = router;
