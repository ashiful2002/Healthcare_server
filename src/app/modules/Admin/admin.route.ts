import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma";

const router = express.Router();

router.get("/", AdminController.getAllAdmins);

router.get("/:id", AdminController.getAdminById);

router.patch(
  "/:id",
  validateRequest(AdminValidation.updateAdminValidation),
  checkAuth(Role.SUPER_ADMIN),
  AdminController.updateAdmin
);

router.delete("/:id", checkAuth(Role.SUPER_ADMIN), AdminController.deleteAdmin);

export const AdminRoutes = router;
