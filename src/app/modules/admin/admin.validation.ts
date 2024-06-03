import { z } from "zod";
import {
  ZodCreateAddressValidationSchema,
  ZodCreateNameValidationSchema,
} from "../student/student.validation";

export const ZodCreateAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .max(30, { message: "Password can not be more than 30 characters" })
      .optional(),
    admin: z.object({
      name: ZodCreateNameValidationSchema,
      gender: z
        .string({
          required_error: "Gender is required",
          invalid_type_error: "Gender must be a string",
        })
        .min(1, { message: "Gender is required" }),
      dateOfBirth: z
        .string({
          required_error: "Date of birth is required",
          invalid_type_error: "Date of birth must be a string",
        })
        .min(1, { message: "Date of birth is required" }),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .min(1, { message: "Email is required" }),
      contactNo: z.string({
        required_error: "Contact number is required",
        invalid_type_error: "Contact number must be a string",
      }),
      emergencyContactNo: z.string({
        required_error: "Emergency contact number is required",
        invalid_type_error: "Emergency contact number must be a string",
      }),
      permanentAddress: ZodCreateAddressValidationSchema,
      presentAddress: ZodCreateAddressValidationSchema,
      profileImage: z
        .string({
          invalid_type_error: "Profile image must be a string",
        })
        .optional(),
      managementDepartment: z
        .string({
          invalid_type_error: "Management department must be a string",
        })
        .min(1, { message: "Management department is required" }),
    }),
  }),
});
