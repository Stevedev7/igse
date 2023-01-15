import { Router } from 'express';
import {
	getTariff,
	updateDayTariff,
	updateGasTariff,
	updateNightTariff,
	updateStandingTariff
} from '../controllers/tariff.controller';

const router = Router();

// Route -> /igse/admin/tariff/update/day
router.put('/update/day', updateDayTariff);

// Route -> /igse/admin/tariff/night
router.put('/update/night', updateNightTariff);

// Route -> /igse/admin/tariff/update/gas
router.put('/update/gas', updateGasTariff);

// Route -> /igse/admin/tariff/update/standing
router.put('/update/standing', updateStandingTariff);

export default router;
