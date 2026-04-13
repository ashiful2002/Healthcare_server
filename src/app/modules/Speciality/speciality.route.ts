import express, { NextFunction, Request, Response } from "express";
import { SpecialityController } from "./speciality.controller";

import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { SpecialtyValidation } from "./speciality.validation";

const router = express.Router();

router.post(
  "/",
  // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
  SpecialityController.createSpecialty
);
router.get("/", SpecialityController.getAllSpecialist);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialityController.deleteSpecialist
);

export const SpecialityRoutes = router;
