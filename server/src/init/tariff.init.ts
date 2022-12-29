import Tariff from '../models/tariff.model';
import { Tariff as TariffEnum, Unit } from '../types/Tariff.interface';

const initTariff = async () => {
	await Tariff.remove();

	const dayReadingTariff = new Tariff({
		tarrifType: TariffEnum.day,
		rate: 0.34,
		unit: Unit.energy
	});

	const nightReadingTariff = new Tariff({
		tarrifType: TariffEnum.night,
		unit: Unit.energy,
		rate: 0.2
	});

	const gasReadingTariff = new Tariff({
		tarrifType: TariffEnum.gas,
		rate: 0.1,
		unit: Unit.energy
	});

	const standingChargeTariff = new Tariff({
		tarrifType: TariffEnum.standing,
		rate: 0.74,
		unit: Unit.time
	});

	await dayReadingTariff.save();
	await nightReadingTariff.save();
	await gasReadingTariff.save();
	await standingChargeTariff.save();

	console.log('Tariffs initialized.');
};

export default initTariff;
