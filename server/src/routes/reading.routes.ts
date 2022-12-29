import { Router } from 'express';
import {
	postNewReading,
	readingGetAll
} from '../controllers/reading.controller';

const router = Router();

// Route ->GET /user/reading
router.get('/', readingGetAll);

// Route ->POST /user/reading/new
router.post('/new', postNewReading);

export default router;
