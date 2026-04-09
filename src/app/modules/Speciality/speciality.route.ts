import express, { NextFunction, Request, Response } from "express";
import { SpecialityController } from "./speciality.controller";

import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma";

const router = express.Router();

router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialityController.createSpecialty
);
router.get("/", SpecialityController.getAllSpecialist);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialityController.deleteSpecialist
);

export const SpecialityRoutes = router;
