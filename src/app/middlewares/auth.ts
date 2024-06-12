import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.constant";
import asyncHandler from "../utils/asyncHandler";

const auth = (...roles: TUserRole[]) => {
  console.log(roles);
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access1");
      }

      // verify token
      jwt.verify(token, config.jwt_access_secret as string, (err, user) => {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access2");
        }

        const { role } = user as JwtPayload;

        if (roles && !roles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access3");
        }
        req.user = user as JwtPayload;
      });

      next();
    }
  );
};

export default auth;
