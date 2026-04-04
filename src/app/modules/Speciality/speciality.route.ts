import express from "express";
import { SpecialityController } from "./speciality.controller";

const router = express.Router();

router.post("/", SpecialityController.createSpecialty);
router.get("/", SpecialityController.getAllSpecialist);
router.delete("/:id", SpecialityController.deleteSpecialist);

export const SpecialityRoutes = router;
