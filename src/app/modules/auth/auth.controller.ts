import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = asyncHandler(async (req, res) => {
  const user = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully!",
    data: user,
  });
});

export const AuthControllers = {
  loginUser,
};
