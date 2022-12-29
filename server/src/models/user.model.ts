import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import UserInterface, { PropertyType } from '../types/User.interface';
import VoucherInterface from '../types/Voucher.interface';

const UserSchema = new Schema<UserInterface>({
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 128,
		unique: true
	},
	name: {
		firstName: {
			required: true,
			minlength: 3,
			maxlength: 50,
			type: String
		},
		middleName: {
			minlength: 3,
			maxlength: 50,
			type: String
		},
		lastName: {
			minlength: 3,
			maxlength: 50,
			type: String
		}
	},
	password: {
		type: String,
		minlength: 8,
		maxlength: 2048,
		required: true,
		select: false
	},
	propertyType: {
		type: String,
		required: true,
		enum: PropertyType
	},
	address: {
		firstLine: {
			type: String,
			required: true
		},
		secondLine: {
			type: String
		},
		city: {
			type: String,
			required: true
		},
		postCode: {
			type: String,
			required: true
		}
	},
	balance: {
		type: Number,
		default: 0
	},
	bedrooms: {
		type: Number,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	readings: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Reading'
		}
	],
	vouchers: [{ type: String, ref: 'Voucher' }]
});

UserSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.hashPassword = function () {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				return reject(err);
			}
			bcrypt.hash(this.password, salt, (error, hash) => {
				if (err) {
					return reject(error);
				}
				this.password = hash;
				return resolve(hash);
			});
		});
	});
};

UserSchema.methods.addReading = async function (id: Schema.Types.ObjectId) {
	await this.readings.push(id);
};

UserSchema.methods.addVoucher = async function (
	code: Pick<VoucherInterface, 'code'>
) {
	await this.vouchers.push(code);
};

export default model<UserInterface>('User', UserSchema);
