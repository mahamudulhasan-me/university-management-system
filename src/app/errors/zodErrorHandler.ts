import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interfaces/error";

const zodErrorHandler = (error: ZodError) => {
  const ZErrorSource: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    ZStatusCode: 400,
    ZMessage: "Validation Error",
    ZErrorSource,
  };
};

export default zodErrorHandler;
