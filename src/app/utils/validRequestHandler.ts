import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import asyncHandler from "./asyncHandler";
const validRequestHandler = (schema: AnyZodObject) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({ body: req.body });
    next();
  });

export default validRequestHandler;
