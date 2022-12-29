import { Document, model, Schema } from 'mongoose';
import TariffInterface, { Tariff } from '../types/Tariff.interface';

const TariffSchema = new Schema<TariffInterface>({
	tarrifType: {
		type: String,
		required: true,
		unique: true,
		enum: Tariff
	},
	rate: {
		type: Number,
		required: true
	},
	unit: {
		type: String,
		required: true
	}
});

export default model<TariffInterface>('Tariff', TariffSchema);
