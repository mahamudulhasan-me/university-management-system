import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { IUser, IUserModel } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordReset: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  this.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

// set empty string after create user
userSchema.post("save", async function (userInfo, next) {
  userInfo.password = "";
  next();
});

userSchema.statics.isUserExist = async function (id: string) {
  const user = await this.findOne({ id, isDeleted: false });
  return user;
};

userSchema.statics.isPasswordMatch = async function (
  plainPass: string,
  hashedPass: string
) {
  const isMatch = await bcrypt.compare(plainPass, hashedPass);
  return isMatch;
};

export const UserModel = model<IUser, IUserModel>("User", userSchema);
