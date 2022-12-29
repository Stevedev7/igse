import { Document, Schema } from 'mongoose';

export enum PaymentStatusType {
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

export default ReadingInterface;
