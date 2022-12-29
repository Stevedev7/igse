import { Document, model, Schema } from 'mongoose';

interface TariffInterface extends Document {
	tarrifType: string;
	rate: number;
}

const TariffSchema = new Schema<TariffInterface>({
	_id: {
		type: String,
		alias: 'tarrifType'
	},
	rate: {
		type: Number,
		default: null
	}
});

export default model<TariffInterface>('Tariff', TariffSchema);
