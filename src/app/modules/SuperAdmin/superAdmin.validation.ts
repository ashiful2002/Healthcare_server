import { z } from "zod";

const updateSuperAdminValidation = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be under 30 characters")
    .optional(),
  profilePhoto: z.url("Invalid URL format").optional(),
  contactNumber: z
    .string()
    .min(11, "Minimum 11 characters")
    .max(15, "Maximum 15 characters")
    .optional(),
});

export const SuperAdminValidation = {
  updateSuperAdminValidation,
};