import { z } from "zod";

const ZodUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .max(30, { message: "Password can not be more than 30 characters" })
    .optional(),
});

export default ZodUserValidationSchema;
