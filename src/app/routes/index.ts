import { Router } from "express";
import { SpecialityRoutes } from "../modules/Speciality/speciality.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

router.use("/specialities", SpecialityRoutes);
router.use("/auth", AuthRoutes);

export const IndexRoutes = router;
