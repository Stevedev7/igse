import { Document, Schema } from 'mongoose';

interface VoucherInterface extends Document {
	code: string;
	used: boolean;
	user: Schema.Types.ObjectId;
	amount: number;
}

export default VoucherInterface;
