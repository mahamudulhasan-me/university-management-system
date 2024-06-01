import { z } from "zod";
import { BloodGroup } from "./student.model";

export const ZodCreateNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(1, { message: "First name is required" }),
  middleName: z
    .string({
      invalid_type_error: "Middle name must be a string",
    })
    .optional(),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(1, { message: "Last name is required" }),
});

export const ZodCreateAddressValidationSchema = z.object({
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(1, { message: "Address is required" }),
  postOffice: z
    .string({
      required_error: "Post office is required",
      invalid_type_error: "Post office must be a string",
    })
    .min(1, { message: "Post office is required" }),
  thana: z
    .string({
      required_error: "Thana is required",
      invalid_type_error: "Thana must be a string",
    })
    .min(1, { message: "Thana is required" }),
  district: z
    .string({
      required_error: "District is required",
      invalid_type_error: "District must be a string",
    })
    .min(1, { message: "District is required" }),
  postalCode: z
    .number({
      invalid_type_error: "Postal code must be a number",
    })
    .optional(),
});

const ZodCreateGuardianValidationSchema = z.object({
  fatherName: ZodCreateNameValidationSchema,
  fatherOccupation: z
    .string({
      required_error: "Father's occupation is required",
      invalid_type_error: "Father's occupation must be a string",
    })
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNumber: z
    .string({
      required_error: "Father's contact number is required",
      invalid_type_error: "Father's contact number must be a string",
    })
    .min(1, { message: "Father's contact number is required" }),
  motherName: ZodCreateNameValidationSchema.optional(),
  motherOccupation: z
    .string({
      required_error: "Mother's occupation is required",
      invalid_type_error: "Mother's occupation must be a string",
    })
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNumber: z
    .string({
      required_error: "Mother's contact number is required",
      invalid_type_error: "Mother's contact number must be a string",
    })
    .min(1, { message: "Mother's contact number is required" }),
});

const ZodCreateLocalGuardianValidationSchema = z.object({
  name: ZodCreateNameValidationSchema,
  occupation: z
    .string({
      required_error: "Occupation is required",
      invalid_type_error: "Occupation must be a string",
    })
    .min(1, { message: "Occupation is required" }),
  contactNumber: z
    .string({
      required_error: "Contact number is required",
      invalid_type_error: "Contact number must be a string",
    })
    .min(1, { message: "Contact number is required" }),
  address: z
    .string({
      invalid_type_error: "Address must be a string",
    })
    .optional(),
});

export const ZodCreateStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .max(30, { message: "Password can not be more than 30 characters" })
      .optional(),
    student: z.object({
      name: ZodCreateNameValidationSchema,
      gender: z.enum(["male", "female"], {
        required_error: "Gender is required",
        invalid_type_error: "Gender must be either 'male' or 'female'",
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      dateOfBirth: z.coerce.date({
        required_error: "Date of birth is required",
        invalid_type_error: "Date of birth must be a valid date",
      }),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email({ message: "Invalid email address" }),
      contactNumber: z
        .string({
          required_error: "Contact number is required",
          invalid_type_error: "Contact number must be a string",
        })
        .min(1, { message: "Contact number is required" }),
      permanentAddress: ZodCreateAddressValidationSchema,
      presentAddress: ZodCreateAddressValidationSchema,
      guardian: ZodCreateGuardianValidationSchema,
      localGuardian: ZodCreateLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z
        .string({
          invalid_type_error: "Profile image must be a string",
        })
        .optional(),
    }),
  }),
});

// Make all fields in student optional for update
export const ZodUpdateStudentValidationSchema = z.object({
  body: z
    .object({
      password: z
        .string({
          invalid_type_error: "Password must be a string",
        })
        .max(30, { message: "Password can not be more than 30 characters" })
        .optional(),
      student: z
        .object({
          name: ZodCreateNameValidationSchema.partial(),
          gender: z
            .enum(["male", "female"], {
              required_error: "Gender is required",
              invalid_type_error: "Gender must be either 'male' or 'female'",
            })
            .optional(),
          bloodGroup: z
            .enum([...BloodGroup] as [string, ...string[]])
            .optional(),
          dateOfBirth: z.coerce
            .date({
              required_error: "Date of birth is required",
              invalid_type_error: "Date of birth must be a valid date",
            })
            .optional(),
          email: z
            .string({
              required_error: "Email is required",
              invalid_type_error: "Email must be a string",
            })
            .email({ message: "Invalid email address" })
            .optional(),
          contactNumber: z
            .string({
              required_error: "Contact number is required",
              invalid_type_error: "Contact number must be a string",
            })
            .min(1, { message: "Contact number is required" })
            .optional(),
          permanentAddress: ZodCreateAddressValidationSchema.partial(),
          presentAddress: ZodCreateAddressValidationSchema.partial(),
          guardian: ZodCreateGuardianValidationSchema.partial(),
          localGuardian: ZodCreateLocalGuardianValidationSchema.partial(),
          admissionSemester: z.string().optional(),
          profileImage: z
            .string({
              invalid_type_error: "Profile image must be a string",
            })
            .optional(),
        })
        .partial(),
    })
    .partial(),
});
