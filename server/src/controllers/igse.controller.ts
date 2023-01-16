import { NextFunction, Request, Response } from 'express';
import { findUsers } from '../services/user.service';
import User from '../models/user.model';
import readingModel from '../models/reading.model';
import { subtract } from 'date-and-time';
import Tariff from '../models/tariff.model';

import { Tariff as TariffEnum } from '../types/Tariff.interface';

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
		propertyCount
	});
};

export const getAverageUsage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { propertyType, bedrooms } = req.params;

	const dayTariff = await Tariff.findOne({ tarrifType: TariffEnum.day });
	const nightTariff = await Tariff.findOne({
		tarrifType: TariffEnum.night
	});
	const standingTariff = await Tariff.findOne({
		tarrifType: TariffEnum.standing
	});
	const gasTariff = await Tariff.findOne({ tarrifType: TariffEnum.gas });

	const users = await User.find({ propertyType, bedrooms });
	const userBillsPerDay = await Promise.all(
		users.map(async (user) => {
			let initialDate = (await readingModel.findById(user.readings[0]))
				.createdAt;
			let finalReading = await readingModel.findById(
				user.readings[user.readings.length - 1]
			);

			let numberOfDays = subtract(
				new Date(finalReading.createdAt),
				new Date(initialDate)
			).toDays();

			if (numberOfDays === 0) {
				return 0;
			}

			let billPerDay =
				(finalReading.dayReading * dayTariff.rate +
					finalReading.nightReading * nightTariff.rate +
					finalReading.gasReading * gasTariff.rate) /
				numberOfDays;

			return billPerDay;
		})
	);

	const averageBill =
		userBillsPerDay.reduce((a, b) => a + b) / userBillsPerDay.length;

	res.json({
		type: propertyType,
		bedrooms,
		average_electricity_gas_cost_per_day: averageBill,
		unit: 'pounds'
	});
};

export default {
	getPropertyCount,
	getAverageUsage
};
