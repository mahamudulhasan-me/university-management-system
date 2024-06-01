import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import zodErrorHandler from "../errors/zodErrorHandler";
import { TErrorSource } from "../interfaces/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // error pattern
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong!";
  let errorSource: TErrorSource = [
    { path: "", message: "Something went wrong!" },
  ];

  if (error instanceof ZodError) {
    const { ZErrorSource, ZMessage, ZStatusCode } = zodErrorHandler(error);

    statusCode = ZStatusCode;
    message = ZMessage;
    errorSource = ZErrorSource;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    stack: config.node_env === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;

// error pattern

/*
{
  success:
  message:
  errorInstance: [
    
  ]
  stack:
}

*/
