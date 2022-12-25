import { NextFunction, Request, Response } from 'express';
import { createReading, setPaymentStatus } from '../services/reading.service';
import { findUserById } from '../services/user.service';

const getReading = async (req: Request, res: Response, next: NextFunction) => {
	res.send('Reading post');
};

// interface ReqUser {

// }

interface Req extends Request {
	user: any;
}

const readingGetAll = async (req: any, res: Response, next: NextFunction) => {
	res.json({ user: req.token });
};

const makePayment = async (req: Request, res: Response, next: NextFunction) => {
	const paymentDone = await setPaymentStatus('ABC');
	res.json(paymentDone);
};

const postNewReading = async (req: any, res: Response, next: NextFunction) => {
	const { dayReading, nightReading, gasReading } = req.body;
	try {
		const user = await findUserById(req.user);
		const newReading = await createReading(
			{
				customer: user._id,
				dayReading,
				nightReading,
				gasReading
			},
			user
		);

		await newReading.save();
		res.json({ newReading, user });
	} catch (e) {
		console.log(e);
		res.status(400).json("Something's wrong");
	}
};

export { postNewReading, readingGetAll };
