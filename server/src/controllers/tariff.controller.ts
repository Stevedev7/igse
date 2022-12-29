import { Response } from 'express';
import {
	getAllTariffs,
	updateDayTariffs,
	updateNightTariffs,
	updateGasTariffs,
	updateStandingTariffs
} from '../services/tariff.service';
import RequestInterface from '../types/Request.interface';

export const getTariff = async (req: RequestInterface, res: Response) => {
	try {
		const tariffs = await getAllTariffs();

		res.json({ tariffs });
	} catch ({ message }) {
		res.status(400).json({ message });
	}
};

export const updateDayTariff = async (req: RequestInterface, res: Response) => {
	try {
		const { rate } = req.body;
		const updatedTariff = await updateDayTariffs(rate);
		res.json({ updatedTariff });
	} catch ({ message }) {
		res.status(400).json({ message });
	}
};

export const updateNightTariff = async (
	req: RequestInterface,
	res: Response
) => {
	try {
		const { rate } = req.body;
		const updatedTariff = await updateNightTariffs(rate);
		res.json({ updatedTariff });
	} catch ({ message }) {
		res.status(400).json({ message });
	}
};

export const updateGasTariff = async (req: RequestInterface, res: Response) => {
	try {
		const { rate } = req.body;
		const updatedTariff = await updateGasTariffs(rate);
		res.json({ updatedTariff });
	} catch ({ message }) {
		res.status(400).json({ message });
	}
};

export const updateStandingTariff = async (
	req: RequestInterface,
	res: Response
) => {
	try {
		const { rate } = req.body;
		const updatedTariff = await updateStandingTariffs(rate);
		res.json({ updatedTariff });
	} catch ({ message }) {
		res.status(400).json({ message });
	}
};

export default {
	getTariff,
	updateDayTariff,
	updateNightTariff,
	updateGasTariff,
	updateStandingTariff
};
