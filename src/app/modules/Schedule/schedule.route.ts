import express from 'express';
import { ScheduleController } from './schedule.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../../../generated/prisma';
import { createScheduleValidationSchema, updateScheduleValidationSchema } from './schedule.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createScheduleValidationSchema), ScheduleController.createSchedule);

router.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR), ScheduleController.getAllSchedules);
router.get('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR), ScheduleController.getScheduleById);

router.patch('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(updateScheduleValidationSchema), ScheduleController.updateSchedule);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ScheduleController.deleteSchedule);

export const ScheduleRoutes = router;
