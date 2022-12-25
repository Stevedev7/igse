import { Schema, model, Document } from 'mongoose';

enum PaymentStatusType {
	PENDING = 'pending',
	PAID = 'paid'
}

interface ReadingInterface extends Document {
	customer: Schema.Types.ObjectId;
	dayReading: number;
	nightReading: number;
	gasReading: number;
	paymentStatus: PaymentStatusType;
	makePayment(): void;
}

const ReadingSchema = new Schema<ReadingInterface>(
	{
		customer: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		dayReading: {
			type: Number,
			required: true
		},
		nightReading: {
			type: Number,
			required: true
		},
		gasReading: {
			type: Number,
			required: true
		},
		paymentStatus: {
			type: String,
			default: PaymentStatusType.PENDING,
			enum: PaymentStatusType
		}
	},
	{ timestamps: true }
);

ReadingSchema.methods.makePayment = function () {
	this.paymentStatus = PaymentStatusType.PAID;
};

export default model<ReadingInterface>('Reading', ReadingSchema);

export { PaymentStatusType, ReadingInterface };
