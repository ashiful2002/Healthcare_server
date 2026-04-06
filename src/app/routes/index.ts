import { Router } from "express";
import { SpecialityRoutes } from "../modules/Speciality/speciality.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

router.use("/specialities", SpecialityRoutes);
router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);

export const IndexRoutes = router;
