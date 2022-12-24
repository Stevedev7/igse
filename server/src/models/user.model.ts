import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserInterface extends Document {
	name: NameInterface;
	email: string;
	password: string;
	propertyType: PropertyType;
	address: AddressInterface;
	balance: number;
	bedrooms: number;
	isAdmin: boolean;
	comparePassword(password: string): boolean;
	hashPassword(): Promise<string>;
	hidePassword(): void;
}
enum PropertyType {
	DETACHED = 'detached',
	SEMI_DETACHED = 'semi-detached',
	TERRACED = 'terraced',
	FLAT = 'flat',
	COTTAGE = 'cottage',
	BUNGALOW = 'bungalow',
	MANSION = 'mansion'
}

interface NameInterface {
	firstName: string;
	middleName: string;
	lastName: string;
}

interface AddressInterface {
	firstLine: string;
	secondLine: string;
	city: string;
	postCode: string;
}

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
		required: true
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
	}
});

UserSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.hashPassword = function () {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(15, (err, salt) => {
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

export default model<UserInterface>('User', UserSchema);

export { UserInterface, NameInterface, AddressInterface, PropertyType };
