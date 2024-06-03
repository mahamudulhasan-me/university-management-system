import { z } from "zod";

export const ZodAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty is Required!",
    }),
  }),
});
