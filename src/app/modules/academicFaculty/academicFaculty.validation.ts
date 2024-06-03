import { z } from "zod";

export const ZodFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty is Required!",
    }),
  }),
});
