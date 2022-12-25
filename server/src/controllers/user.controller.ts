import { NextFunction, Request, Response } from 'express';
import {
	createUser,
	findAllUsers,
	findUser,
	saveUser,
	setPassword
} from '../services/user.service';

export const postUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			name,
			password,
			email,
			balance,
			bedrooms,
			address,
			propertyType
		} = req.body;
		const user = await findUser('email', email);
		if (user == null) {
			const newUser = await createUser({
				name,
				password,
				email,
				balance,
				bedrooms,
				address,
				propertyType
			});
			await setPassword(newUser);
			await saveUser(newUser);
			res.json(newUser);
			return next();
		}

		throw new Error('User Exists');
	} catch ({ message }) {
		res.status(400).json({
			error: message
		});
	}
};

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const allUsers = await findAllUsers();
		res.json(allUsers);
	} catch (err) {
		res.json(err);
		console.log(err);
	}
};

export default {
	postUser,
	getUsers
};
