import { z } from "zod";
import {
  months,
  semesterCode,
  semesterName,
} from "./academicSemester.constant";

export const ZodCreateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]], {
      required_error: "Semester name is required",
      invalid_type_error:
        "Semester name must be one of 'Autumn', 'Summer', or 'Fall'",
    }),
    code: z.enum([...semesterCode] as [string, ...string[]], {
      required_error: "Semester code is required",
      invalid_type_error: "Semester code must be one of '01', '02', or '03'",
    }),
    year: z.string({
      required_error: "Year is required",
    }),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: "Start month is required",
      invalid_type_error: "Start month must be a valid month",
    }),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: "End month is required",
      invalid_type_error: "End month must be a valid month",
    }),
  }),
});

export const ZodUpdateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...semesterName] as [string, ...string[]], {
        required_error: "Semester name is required",
        invalid_type_error:
          "Semester name must be one of 'Autumn', 'Summer', or 'Fall'",
      })
      .optional(),
    code: z
      .enum([...semesterCode] as [string, ...string[]], {
        required_error: "Semester code is required",
        invalid_type_error: "Semester code must be one of '01', '02', or '03'",
      })
      .optional(),
    year: z
      .string({
        required_error: "Year is required",
      })
      .optional(),
    startMonth: z
      .enum([...months] as [string, ...string[]], {
        required_error: "Start month is required",
        invalid_type_error: "Start month must be a valid month",
      })
      .optional(),
    endMonth: z
      .enum([...months] as [string, ...string[]], {
        required_error: "End month is required",
        invalid_type_error: "End month must be a valid month",
      })
      .optional(),
  }),
});
