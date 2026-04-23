import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma";
import { validateRequest } from "../../middlewares/validateRequest";
import { ScheduleController } from "./schedule.controller";
import { createScheduleValidationSchema, updateScheduleValidationSchema } from "./schedule.validation";

const router = Router();

router.post('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createScheduleValidationSchema), ScheduleController.createSchedule);
router.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR), ScheduleController.getAllSchedules);
router.get('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR), ScheduleController.getScheduleById);
router.patch('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(updateScheduleValidationSchema), ScheduleController.updateSchedule);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ScheduleController.deleteSchedule);

export const scheduleRoutes = router;