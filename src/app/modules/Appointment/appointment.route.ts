import express from 'express';
import { AppointmentController } from './appointment.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../../../generated/prisma';

const router = express.Router();

router.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AppointmentController.getAllAppointments);
router.get('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AppointmentController.getAppointmentById);
router.post('/', checkAuth(Role.PATIENT), AppointmentController.createAppointment);
router.patch('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AppointmentController.updateAppointment);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), AppointmentController.deleteAppointment);

export const AppointmentRoutes = router;
