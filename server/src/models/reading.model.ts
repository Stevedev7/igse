import { format } from 'date-and-time';
import { Schema, model } from 'mongoose';
import ReadingInterface, {
	PaymentStatusType
} from '../types/Reading.interface';

const ReadingSchema = new Schema<ReadingInterface>({
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
	},
	bill: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		required: true
	}
});

ReadingSchema.methods.makePayment = function () {
	this.paymentStatus = PaymentStatusType.PAID;
};

export default model<ReadingInterface>('Reading', ReadingSchema);
