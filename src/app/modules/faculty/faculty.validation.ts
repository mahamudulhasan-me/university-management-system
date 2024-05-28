import { z } from "zod";

export const ZodCreateFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Academic Faculty is Required!",
  }),
});
