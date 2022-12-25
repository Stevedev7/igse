import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.json({
		message: 'igse home route'
	});
});

export default router;
