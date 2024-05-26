import { z } from "zod";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const ZodAcademicSemesterValidationSchema = z.object({
  name: z.enum(["Autumn", "Summer", "Fall"], {
    required_error: "Semester name is required",
    invalid_type_error:
      "Semester name must be one of 'Autumn', 'Summer', or 'Fall'",
  }),
  code: z.enum(["01", "02", "03"], {
    required_error: "Semester code is required",
    invalid_type_error: "Semester code must be one of '01', '02', or '03'",
  }),
  year: z.date({
    required_error: "Year is required",
    invalid_type_error: "Year must be a valid date",
  }),
  startMonth: z.enum(months, {
    required_error: "Start month is required",
    invalid_type_error: "Start month must be a valid month",
  }),
  endMonth: z.enum(months, {
    required_error: "End month is required",
    invalid_type_error: "End month must be a valid month",
  }),
});

export default ZodAcademicSemesterValidationSchema;
