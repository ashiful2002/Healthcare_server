import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getPaymentById);
router.post('/', PaymentController.createPayment);
router.patch('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

export const PaymentRoutes = router;
