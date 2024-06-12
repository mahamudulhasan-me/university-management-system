import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const user = await UserModel.isUserExist(id);
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (user?.status === "inactive") {
    throw new AppError(httpStatus.FORBIDDEN, "User not active!");
  }

  if (!(await UserModel.isPasswordMatch(password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials!");
  }

  const jwtToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    jwtToken,
    needsPasswordChange: user?.needsPasswordReset,
  };
};

export const AuthServices = { loginUser };
