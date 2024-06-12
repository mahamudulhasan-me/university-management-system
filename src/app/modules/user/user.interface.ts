import { Model } from "mongoose";

export interface IUser {
  id: string;
  password: string;
  needsPasswordReset: boolean;
  role: "admin" | "student" | "faculty";
  status: "active" | "inactive";
  isDeleted: boolean;
}

// export interface INewUser {
//   id: string;
//   password: string;
//   role: "admin" | "student" | "faculty";
// }

export interface IUserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser | null>;
  isPasswordMatch(plainPass: string, hashedPass: string): Promise<boolean>;
}
