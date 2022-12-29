import Tariff from '../models/tariff.model';
import { Tariff as TariffEnum } from '../types/Tariff.interface';

export const getAllTariffs = async () => await Tariff.find({});

export const updateDayTariffs = async (rate: number) =>
	await Tariff.findOneAndUpdate(
		{ tarrifType: TariffEnum.day },
		{ $set: { rate } }
	);

export const updateNightTariffs = async (rate: number) =>
	await Tariff.findOneAndUpdate(
		{ tarrifType: TariffEnum.night },
		{ $set: { rate } }
	);

export const updateGasTariffs = async (rate: number) =>
	await Tariff.findOneAndUpdate(
		{ tarrifType: TariffEnum.gas },
		{ $set: { rate } }
	);

export const updateStandingTariffs = async (rate: number) =>
	await Tariff.findOneAndUpdate(
		{ tarrifType: TariffEnum.standing },
		{ $set: { rate } }
	);

export default {
	getAllTariffs,
	updateDayTariffs,
	updateNightTariffs,
	updateGasTariffs,
	updateStandingTariffs
};
