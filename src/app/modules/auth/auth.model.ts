import { Schema, model } from "mongoose";
import { ILoginUser } from "./auth.interface";

export const loginUserSchema = new Schema<ILoginUser>({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const LoginUserModel = model<ILoginUser>("LoginUser", loginUserSchema);
