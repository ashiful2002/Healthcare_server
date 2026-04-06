import { Router } from "express";
import { SpecialityRoutes } from "../modules/Speciality/speciality.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";
import { DoctorRoutes } from "../modules/Doctor/doctor.route";

const router = Router();

router.use("/specialities", SpecialityRoutes);
router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/doctors", DoctorRoutes);

export const IndexRoutes = router;
