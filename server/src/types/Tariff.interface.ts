import { Document } from 'mongoose';

export interface TariffInterface extends Document {
	tarrifType: string;
	rate: number;
	unit: string;
}

export enum Tariff {
	day = 'Day',
	night = 'Night',
	gas = 'Gas',
	standing = 'Standing Charge'
}

export enum Unit {
	energy = 'kWh',
	time = 'day'
}

export default TariffInterface;
