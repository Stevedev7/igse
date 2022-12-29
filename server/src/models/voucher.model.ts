import { model, Schema } from 'mongoose';
import VoucherInterface from '../types/Voucher.interface';

const VoucherSchema = new Schema<VoucherInterface>(
	{
		code: {
			type: String,
			required: true,
			unique: true,
			uppercase: true,
			validate: {
				validator: (code: string) => code.length === 8,
				message: (code) => `${code.value} has to be 8 digits`
			}
		},
		used: {
			type: Boolean,
			default: false
		},
		amount: {
			type: Number,
			default: 200
		},
		user: Schema.Types.ObjectId
	},
	{
		timestamps: true
	}
);

export default model<VoucherInterface>('Voucher', VoucherSchema);
