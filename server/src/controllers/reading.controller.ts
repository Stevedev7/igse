import { NextFunction, Request, Response } from 'express';
import {
	createReading,
	findReadingById,
	setPaymentStatus
} from '../services/reading.service';
import { findUser, findUserById } from '../services/user.service';
import RequestInterface from '../types/Request.interface';

const readingGetAll = async (
	req: RequestInterface,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await findUser('email', req.user.email);
		if ((user.readings.length as number) === 0) {
			return res.status(404).json({ message: 'No readings yet.' });
		}

		const readings = [] as any;

		for (let i = 0; i < user.readings.length; i++) {
			readings.push(await findReadingById(user.readings[i]));
		}

		return res.json({ readings });
	} catch (e: any) {
		const { message } = e;
		res.status(400).json({ message });
	}
};

const makePayment = async (req: Request, res: Response, next: NextFunction) => {
	const paymentDone = await setPaymentStatus('ABC');
	res.json(paymentDone);
};

const postNewReading = async (
	req: RequestInterface,
	res: Response,
	next: NextFunction
) => {
	const { dayReading, nightReading, gasReading } = req.body;
	try {
		const user = await findUser('email', req.user.email);
		const reading = await createReading(
			{
				customer: user._id,
				dayReading,
				nightReading,
				gasReading
			},
			user
		);

		await reading.save();
		res.json({ message: 'New Reading created.', reading });
	} catch (e) {
		console.log(e);
		res.status(400).json("Something's wrong");
	}
};

export { postNewReading, readingGetAll, makePayment };
