import { NextFunction, Request, Response } from 'express';
import { findUser } from '../services/user.service';
import { validateLoginInput } from '../validations/user.validation';

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	const { error } = validateLoginInput({ email, password });

	if (error) {
		return res.status(400).send({ message: error.details[0].message });
	}

	const user = await findUser('email', email);
	if (user == null) {
		return res.status(404).send({ message: 'Username not found' });
	}

	const match = await user.comparePassword(password);
	if (!match) {
		return res.status(403).send('Wrong Password');
	}
	res.json('credentials match');
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
