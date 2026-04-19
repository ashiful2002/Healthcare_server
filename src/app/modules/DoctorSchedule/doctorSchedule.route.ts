import express from 'express';
import { DoctorScheduleController } from './doctorSchedule.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../../../generated/prisma';

const router = express.Router();

router.get('/', DoctorScheduleController.getAllDoctorSchedules);
router.get('/:id', DoctorScheduleController.getDoctorScheduleById);
router.post('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DoctorScheduleController.createDoctorSchedule);
router.patch('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DoctorScheduleController.updateDoctorSchedule);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DoctorScheduleController.deleteDoctorSchedule);

export const DoctorScheduleRoutes = router;
