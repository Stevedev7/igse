import { NextFunction, Request, Response } from 'express';
import { findUser } from '../services/user.service';
import { validateLoginInput } from '../validations/user.validation';
import jwt, { Secret } from 'jsonwebtoken';

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	const { error } = validateLoginInput({ email, password });

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const user = await findUser('email', email);
	if (user == null) {
		return res.status(404).json({ error: 'Username not found' });
	}

	const match = await user.comparePassword(password);
	if (!match) {
		return res.status(403).json({ error: 'Wrong Password' });
	}
	const { _id, isAdmin } = user;
	const accessToken = jwt.sign(
		{ _id, email, isAdmin },
		process.env.ACCESS_TOKEN_SECRET as Secret,
		{
			expiresIn: '30m'
		}
	);

	res.json({
		message: 'Logged in',
		accessToken
	});
};

export const logoutUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.send('Logout Route');
};

export default {
	loginUser,
	logoutUser
};
