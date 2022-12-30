import { format } from 'date-and-time';
import { Schema } from 'mongoose';
import Reading from '../models/reading.model';
import { PaymentStatusType } from '../types/Reading.interface';
import UserInterface from '../types/User.interface';
import { addReading, saveUser } from './user.service';

export const createReading = async (
	{
		dayReading,
		nightReading,
		gasReading,
		customer,
		bill,
		date
	}: {
		dayReading: number;
		nightReading: number;
		gasReading: number;
		customer: {
			_id: Schema.Types.ObjectId;
		};
		bill: number;
		date: string;
	},
	user: UserInterface
) => {
	const reading = new Reading({
		dayReading,
		nightReading,
		gasReading,
		customer,
		bill,
		createdAt: new Date(format(new Date(date), 'YYYY-MM-DD'))
	});
	const updatedUser = await addReading(user._id, reading._id);
	await saveUser(updatedUser);
	return reading;
};

export const setPaymentStatus = async (readingId: string) => {
	const reading = await Reading.findById(readingId);
	reading.paymentStatus = PaymentStatusType.PAID;
	await reading.save();
};
export const findReadingById = async (id: Schema.Types.ObjectId) =>
	await Reading.findById(id);

export default { createReading, setPaymentStatus, findReadingById };
