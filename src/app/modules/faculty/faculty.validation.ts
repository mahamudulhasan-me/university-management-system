import { z } from "zod";
import {
  ZodCreateAddressValidationSchema,
  ZodCreateNameValidationSchema,
} from "../student/student.validation";

export const ZodCreateFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "Password is required",
        required_error: "Password is required",
      })
      .max(30, { message: "Password can not be more than 30 characters" })
      .optional(),
    faculty: z.object({
      name: ZodCreateNameValidationSchema,
      gender: z.enum(["male", "female"], {
        required_error: "Gender is required",
        invalid_type_error: "Gender must be either 'male' or 'female'",
      }),
      designation: z.string({
        invalid_type_error: "Designation is required",
        required_error: "Designation is required",
      }),

      dateOfBirth: z.string({
        invalid_type_error: "Date of birth is required",
        required_error: "Date of birth is required",
      }),

      email: z.string({
        invalid_type_error: "Email is required",
        required_error: "Email is required",
      }),

      contactNo: z.string({
        invalid_type_error: "Contact number is required",
        required_error: "Contact number is required",
      }),

      emergencyContactNo: z.string({
        invalid_type_error: "Emergency contact number is required",
        required_error: "Emergency contact number is required",
      }),

      permanentAddress: ZodCreateAddressValidationSchema,
      presentAddress: ZodCreateAddressValidationSchema,
      profileImage: z.string({
        invalid_type_error: "Profile image is required",
        required_error: "Profile image is required",
      }),

      academicDepartment: z.string({
        invalid_type_error: "Academic department is required",
        required_error: "Academic department is required",
      }),

      academicFaculty: z.string({
        invalid_type_error: "Academic faculty is required",
        required_error: "Academic faculty is required",
      }),
    }),
  }),
});
