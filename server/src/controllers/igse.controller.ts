import { NextFunction, Request, Response } from 'express';
import { findUsers } from '../services/user.service';

export const getPropertyCount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const propertyCount = {
		flat: (await findUsers('propertyType', 'flat')).length,
		detached: (await findUsers('propertyType', 'detached')).length,
		'semi-detached': (await findUsers('propertyType', 'semi-detached'))
			.length,
		terraced: (await findUsers('propertyType', 'terraced')).length,
		cottage: (await findUsers('propertyType', 'cottage')).length,
		bungalow: (await findUsers('propertyType', 'bungalow')).length,
		mansion: (await findUsers('propertyType', 'mansion')).length
	};
	res.json({
		message: 'igse home route',
		propertyCount
	});
};

export const getAverageUsage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.json('');
};

export default {
	getPropertyCount
};
