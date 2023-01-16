import { Router, Request, Response } from 'express';
import checkIfAdmin from '../middlewares/adminVerify';
import authenticateToken from '../middlewares/authenticateToken';
import RequestInterface from '../types/Request.interface';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'Hello World'
	});
});

router.get(
	'/token',
	authenticateToken,
	(req: RequestInterface, res: Response) => {
		res.json(req.user);
	}
);

router.get(
	'/admin/verify',
	authenticateToken,
	checkIfAdmin,
	(req: RequestInterface, res: Response) => {
		res.json(req.user);
	}
);

export default router;
