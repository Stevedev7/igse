import { Router } from 'express';
import voucherRoutes from './voucher.routes';
import tariffRoutes from './tariff.routes';
const router = Router();

// Routes -> /igse/admin/voucher/*
router.use('/voucher', voucherRoutes);

// Routes -> /igse/admin/tariff/*
router.use('/tariff', tariffRoutes);

export default router;
