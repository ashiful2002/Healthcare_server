import z from "zod";
import { Gender } from "../../../generated/prisma";

export const createDoctorZodSchema = z.object({
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be less than 20 characters long"),
  doctor: z.object({
    name: z
      .string("Name is required")
      .min(5, "minimum 5 character is required")
      .max(30, "name can be max 30 character"),
    email: z.email("Invalid email format"),
    contactNumber: z
      .string("Contact number is required")
      .min(11, "min contact number is 11 character")
      .max(15, "contact number can be maz 15 character"),
    address: z.string("Address is required").optional(),
    registrationNumber: z.string("Registration number is required"),
    profilePhoto: z.string("Profile photo is required"),
    experiance: z
      .number("Experience is required")
      .int("experience only possible in integer")
      .nonnegative("Experiance cannot be Negetive number"),
    gender: z.enum(
      [Gender.MALE, Gender.FEMALE],
      "Gender must be either MALE or FEMALE"
    ),
    appointMentFee: z
      .number("Appointment fee is required")
      .min(0, "Invalid fee"),
    qualifications: z
      .string("Qualifications are required")
      .min(5, "Qualifications must be at least 5 character")
      .max(30, "Qualifications must be in 30 characters"),
    currentWorkingPlace: z
      .string("Current working place is required")
      .min(5, "current working place must be at least 5 character")
      .max(30, "must be in 30 characters"),
    designation: z
      .string("Designation is required")
      .min(5, "designationmin must be at least 5 character")
      .max(30, "designation must be in 30 characters"),
  }),
  specialities: z
    .array(z.uuid(), "specialities must be an array of strings")
    .min(1, "at least one specialities is required"),
});
export const userValidationSchema = {
  //   createDoctorZodSchema,
};
