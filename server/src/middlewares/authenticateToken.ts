import { NextFunction, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import RequestInterface from '../types/Request.interface';

export default (req: RequestInterface, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) {
		return res.status(401).json({
			message: 'Unauthorized'
		});
	}
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET as Secret,
		(err: any, user: any) => {
			if (err) {
				return res.status(403).json({
					message: 'Forbidden'
				});
			}
			req.user = user;
			next();
		}
	);
};
