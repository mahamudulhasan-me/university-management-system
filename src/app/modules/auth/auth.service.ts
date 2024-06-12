import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const user = await UserModel.isUserExist(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (user?.status === "inactive") {
    throw new AppError(httpStatus.FORBIDDEN, "User not active!");
  }

  if (!(await UserModel.isPasswordMatch(password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials!");
  }

  return user;
};

export const AuthServices = { loginUser };
