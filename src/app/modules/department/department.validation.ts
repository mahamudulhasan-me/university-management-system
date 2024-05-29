import { z } from "zod";

export const ZodCreateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Department name is required",
      required_error: "Department name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty is required",
      required_error: "Academic Faculty is required",
    }),
  }),
});

export const ZodUpdateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Department name is required",
        required_error: "Department name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty is required",
        required_error: "Academic Faculty is required",
      })
      .optional(),
  }),
});
