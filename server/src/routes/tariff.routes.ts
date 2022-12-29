import { Router } from 'express';
import {
	getTariff,
	updateDayTariff,
	updateGasTariff,
	updateNightTariff,
	updateStandingTariff
} from '../controllers/tariff.controller';

const router = Router();

// Route -> /igse/admin/tariff/
router.get('/', getTariff);

// Route -> /igse/admin/tariff/update/day
router.post('/update/day', updateDayTariff);

// Route -> /igse/admin/tariff/night
router.post('/update/night', updateNightTariff);

// Route -> /igse/admin/tariff/update/gas
router.post('/update/gas', updateGasTariff);

// Route -> /igse/admin/tariff/update/standing
router.post('/update/standing', updateStandingTariff);

export default router;
