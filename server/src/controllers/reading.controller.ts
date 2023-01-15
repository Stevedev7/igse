import { NextFunction, Request, Response } from 'express';
import {
	createReading,
	findReadingById,
	setPaymentStatus
} from '../services/reading.service';
import { findUser, findUserById } from '../services/user.service';
import RequestInterface from '../types/Request.interface';
import Tariff from '../models/tariff.model';
import { Tariff as TariffEnum } from '../types/Tariff.interface';
import { validateReadings } from '../validations/reading.validate';
import { format, subtract } from 'date-and-time';

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

		const latest = await findReadingById(
			user.readings[user.readings.length - 1]
		);

		if (
			!validateReadings(
				{
					day: dayReading,
					night: nightReading,
					gas: gasReading
				},
				latest
			)
		) {
			throw new Error(
				`Invalid readings. Please enter readings that are more than previous readings.
				Day Reading: 	${latest.dayReading}
				Night Reading: 	${latest.nightReading}
				Gas Reading: 	${latest.gasReading}`
			);
		}

		const dayTariff = await Tariff.findOne({ tarrifType: TariffEnum.day });
		const nightTariff = await Tariff.findOne({
			tarrifType: TariffEnum.night
		});
		const standingTariff = await Tariff.findOne({
			tarrifType: TariffEnum.standing
		});
		const gasTariff = await Tariff.findOne({ tarrifType: TariffEnum.gas });
		const date =
			req.body.date || format(new Date(Date.now()), 'YYYY-MM-DD');
		const numberOfDays = subtract(
			new Date(date),
			latest.createdAt
		).toDays();

		if (numberOfDays <= 0) {
			throw new Error(
				`Invalid date. Date cannot be earlier than the previous reading(${format(
					latest.createdAt,
					'YYYY-MM-DD'
				)}).`
			);
		}

		const bill =
			(dayReading - latest.dayReading) * dayTariff.rate +
			(nightReading - latest.nightReading) * nightTariff.rate +
			(gasReading - latest.gasReading) * gasTariff.rate;
		const reading = await createReading(
			{
				customer: user._id,
				dayReading,
				nightReading,
				gasReading,
				bill,
				date
			},
			user
		);

		await reading.save();
		res.json({
			message: 'New Reading created.',
			reading,
			numberOfDays
		});
	} catch ({ message }) {
		res.status(400).json({ error: message });
	}
};

export { postNewReading, readingGetAll, makePayment };
