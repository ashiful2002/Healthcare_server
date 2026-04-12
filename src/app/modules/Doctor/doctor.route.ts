import express from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma";

const router = express.Router();

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorController.getAllDoctors
);
router.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorController.getDoctorById
);
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),

  DoctorController.updateDoctor
);
router.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),

  DoctorController.deleteDoctor
);

export const DoctorRoutes = router;
