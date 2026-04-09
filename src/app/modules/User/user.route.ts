import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createAdminValidationSchema,
  createDoctorValidation,
  createSuperAdminValidationSchema,
} from "./user.validation";

const router = express.Router();

router.post(
  "/create-doctor",
  validateRequest(createDoctorValidation),
  UserController.createDoctor
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin
);

router.post(
  "/create-superadmin",
  validateRequest(createSuperAdminValidationSchema),
  UserController.createSuperAdmin
);

export const UserRoutes = router;
