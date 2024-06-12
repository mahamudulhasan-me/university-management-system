import { z } from "zod";

export const ZodUserLoginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      invalid_type_error: "Id must be a string",
      required_error: "Id is required",
    }),
    password: z.string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    }),
  }),
});
