import z from "zod";
import { Gender } from "../../../generated/prisma";

export const createDoctorValidation = z.object({
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
      .max(15, "contact number can be max 15 character"),
    address: z.string("Address is required").optional(),
    registrationNumber: z.string("Registration number is required"),
    profilePhoto: z.string("Profile photo is required").optional(),
    experiance: z
      .number("Experience is required")
      .int("experience only possible in integer")
      .nonnegative("Experience cannot be negative number")
      .optional(),
    gender: z.enum(
      [Gender.MALE, Gender.FEMALE],
      "Gender must be either MALE or FEMALE"
    ),
    appointMentFee: z
      .number("Appointment fee is required")
      .min(0, "Invalid fee"),
    qualifications: z
      .string("Qualifications are required")
      .min(5, "Qualifications must be at least 5 characters")
      .max(30, "Qualifications must be under 30 characters"),
    currentWorkingPlace: z
      .string("Current working place is required")
      .min(5, "Current working place must be at least 5 characters")
      .max(30, "Must be under 30 characters"),
    designation: z
      .string("Designation is required")
      .min(5, "Designation must be at least 5 characters")
      .max(30, "Designation must be under 30 characters"),
  }),
  specialities: z
    .array(z.uuid(), "specialities must be an array of UUIDs")
    .min(1, "At least one speciality is required"),
});


// claude code
export const createAdminValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  admin: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format"),
    profilePhoto: z.url("Invalid URL format").optional(),
    contactNumber: z.string().min(1, "Contact number is required"),
  }),
});

export const createSuperAdminValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  admin: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format"),
    profilePhoto: z.url("Invalid URL format").optional(),
    contactNumber: z.string().min(1, "Contact number is required"),
  }),
});