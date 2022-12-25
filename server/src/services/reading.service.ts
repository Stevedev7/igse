import { Schema } from 'mongoose';
import Reading, {
	PaymentStatusType,
	ReadingInterface
} from '../models/reading.model';
import { UserInterface } from '../models/user.model';
import { addReading, saveUser } from './user.service';

export const createReading = async (
	{
		dayReading,
		nightReading,
		gasReading,
		customer
	}: {
		dayReading: number;
		nightReading: number;
		gasReading: number;
		customer: {
			_id: Schema.Types.ObjectId;
		};
	},
	user: UserInterface
) => {
	const reading = new Reading({
		dayReading,
		nightReading,
		gasReading,
		customer
	});
	const updatedUser = await addReading(user._id, reading._id);
	await saveUser(updatedUser);
	return reading;
};

export const setPaymentStatus = async (readingId: string) => {
	return await Reading.findByIdAndUpdate(readingId, {
		paymentStatus: PaymentStatusType.PAID
	});
};

export default { createReading, setPaymentStatus };
