import { Router } from 'express';
import {
	postNewReading,
	readingGetAll
} from '../controllers/reading.controller';

const router = Router();

// Route -> /user/reading
router.get('/', readingGetAll);

// Route -> /user/reading/new
router.post('/new', postNewReading);

export default router;
