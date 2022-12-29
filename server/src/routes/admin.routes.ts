import { Router } from 'express';
import voucherRoutes from './voucher.routes';
const router = Router();

// Routes -> /igse/admin/voucher/*
router.use('/voucher', voucherRoutes);

export default router;
