import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import z from "zod";
import { Gender } from "../../../generated/prisma";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDoctorZodSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  UserController.createDoctor
);
// router.post("/create-admin", UserController.createDoctor);
// router.post("/create-superadmin", UserController.createDoctor);

export const UserRoutes = router;
