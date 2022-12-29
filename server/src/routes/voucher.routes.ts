import { Router } from 'express';
import {
	postVoucher,
	getAllVoucher,
	getVoucher
} from '../controllers/voucher.controller';
const router = Router();

// Route -> /igse/admin/voucher
router.get('/', getAllVoucher);

router.get('/:code', getVoucher);

// Route -> /igse/admin/voucher/new
router.post('/new', postVoucher);

export default router;
