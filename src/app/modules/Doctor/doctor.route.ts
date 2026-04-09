import express from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);
router.patch(
  "/:id",
  checkAuth("ADMIN", "SUPER_ADMIN"),
  DoctorController.updateDoctor
);
router.delete(
  "/:id",
  checkAuth("ADMIN", "SUPER_ADMIN"),
  DoctorController.deleteDoctor
);

export const DoctorRoutes = router;
