import { Schema } from 'mongoose';
import User, {
	UserInterface,
	NameInterface,
	AddressInterface,
	PropertyType
} from '../models/user.model';

export const createUser = async ({
	email,
	password,
	name,
	balance,
	bedrooms,
	address,
	propertyType
}: {
	name: NameInterface;
	email: string;
	password: string;
	balance: number;
	bedrooms: number;
	address: AddressInterface;
	propertyType: PropertyType;
}) =>
	new User({
		password,
		name,
		email,
		balance,
		bedrooms,
		address,
		propertyType
	});

export const saveUser = async (user: UserInterface) => await user.save();

export const deleteUser = async (user: UserInterface) =>
	await User.findByIdAndDelete(user._id);

export const findUser = async (field: string, value: string) =>
	await User.findOne({ [field]: value }).select('+password');

export const findUserById = async (id: typeof Schema.Types.ObjectId) =>
	await User.findById(id);

export const findAllUsers = async () => await User.find({});

export const setPassword = async (user: UserInterface) => {
	return await user.hashPassword();
};

export default {
	createUser,
	saveUser,
	deleteUser,
	findUser,
	findUserById,
	setPassword
};
