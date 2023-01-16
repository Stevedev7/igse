import { Router } from 'express';
import {
	getAverageUsage,
	getPropertyCount
} from '../controllers/igse.controller';
import { getTariff } from '../controllers/tariff.controller';
import checkIfAdmin from '../middlewares/adminVerify';
import authenticateToken from '../middlewares/authenticateToken';
import adminRoute from './admin.routes';

const router = Router();

// Route -> /igse/
router.get('/', getPropertyCount);

// Route -> /igse/tariff
router.get('/tariff', getTariff);

// Route -> /igse/propertycount
router.get('/propertycount', getPropertyCount);

// Route -> /igse/property-type/bedrooms
router.get('/:propertyType/:bedrooms', getAverageUsage);

// Routes -> /igse/admin/*
router.use('/admin', authenticateToken, checkIfAdmin, adminRoute);

export default router;
