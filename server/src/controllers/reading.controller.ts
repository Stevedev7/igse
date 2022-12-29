import { NextFunction, Request, Response } from 'express';
import { createReading, setPaymentStatus } from '../services/reading.service';
import { findUserById } from '../services/user.service';
import RequestInterface from '../types/Request.interface';

const getReading = async (req: Request, res: Response, next: NextFunction) => {
	res.send('Reading post');
};

const readingGetAll = async (
	req: RequestInterface,
	res: Response,
	next: NextFunction
) => {
	res.json({ user: req.user });
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
		const user = await findUserById(req.user._id);
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
