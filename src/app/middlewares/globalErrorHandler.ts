import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";

  return res.status(statusCode).json({
    success: false,
    message: error.message || message,
    error,
  });
};

export default globalErrorHandler;