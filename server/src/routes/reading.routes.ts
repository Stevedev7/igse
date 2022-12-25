import { Router } from 'express';
import {
	postNewReading,
	readingGetAll
} from '../controllers/reading.controller';

import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.get('/', authenticateToken, readingGetAll);
router.post('/new', authenticateToken, postNewReading);

export default router;
