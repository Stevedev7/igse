import { NextFunction, Response } from 'express';
import RequestInterface from '../types/Request.interface';

const checkIfAdmin = async (
	req: RequestInterface,
	res: Response,
	next: NextFunction
) => {
	const user = req.user;
	if (!user.isAdmin) {
		return res.status(403).json({ message: 'Forbidden' });
	}
	next();
};
export default checkIfAdmin;
