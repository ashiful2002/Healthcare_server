import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { SuperAdminController } from "./superAdmin.controller";
import { SuperAdminValidation } from "./superAdmin.validation";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.get("/", SuperAdminController.getAllSuperAdmins);

router.get("/:id", SuperAdminController.getSuperAdminById);

router.patch(
  "/:id",
  validateRequest(SuperAdminValidation.updateSuperAdminValidation),
  checkAuth("SUPER_ADMIN"),
  SuperAdminController.updateSuperAdmin
);

router.delete(
  "/:id",
  checkAuth("SUPER_ADMIN"),
  SuperAdminController.deleteSuperAdmin
);

export const SuperAdminRoutes = router;
