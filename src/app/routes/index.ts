import { Router } from "express";
import { SpecialityRoutes } from "../modules/Speciality/speciality.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";
import { DoctorRoutes } from "../modules/Doctor/doctor.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { SuperAdminRoutes } from "../modules/SuperAdmin/superAdmin.route";
import { scheduleRoutes } from "../modules/Schedule/schedule.route";
import { DoctorScheduleRoutes } from "../modules/DoctorSchedule/doctorSchedule.route";
import { PaymentRoutes } from "../modules/Payment/payment.route";
import { AppointmentRoutes } from "../modules/Appointment/appointment.route";

const router = Router();

router.use("/specialities", SpecialityRoutes);
router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/doctors", DoctorRoutes);
router.use("/admins", AdminRoutes);
router.use("/super-admins", SuperAdminRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/doctor-schedules", DoctorScheduleRoutes);
router.use("/appointments", AppointmentRoutes);
router.use("/payments", PaymentRoutes);

export const IndexRoutes = router;
