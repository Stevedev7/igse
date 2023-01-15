import { Schema } from 'mongoose';
import { getVoucher } from '../controllers/voucher.controller';
import User from '../models/user.model';
import voucherModel from '../models/voucher.model';
import UserInterface, {
	AddressInterface,
	NameInterface,
	PropertyType
} from '../types/User.interface';
import VoucherInterface from '../types/Voucher.interface';
import { findVoucher } from './voucher.service';

export const createUser = async ({
	email,
	password,
	name,
	balance,
	bedrooms,
	address,
	propertyType,
	isAdmin
}: {
	name: NameInterface;
	email: string;
	password: string;
	isAdmin?: boolean;
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
		propertyType,
		isAdmin
	});

export const saveUser = async (user: UserInterface) => await user.save();

export const deleteUser = async (user: UserInterface) =>
	await User.findByIdAndDelete(user._id);

export const findUser = async (field: string, value: string) =>
	await User.findOne({ [field]: value }).select('+password');

export const findUserById = async (id: Schema.Types.ObjectId) =>
	await User.findById(id);

export const findAllUsers = async () => await User.find({});

export const setPassword = async (user: UserInterface) => {
	return await user.hashPassword();
};

export const findUsers = async (field: string, value: string) =>
	await User.find({ [field]: value }).select('+password');

export const addReading = async (
	userId: Schema.Types.ObjectId,
	reading: Schema.Types.ObjectId
) => {
	const user = await User.findById(userId);
	user.addReading(reading);
	return user;
};

export const useVoucher = async (
	userId: Schema.Types.ObjectId,
	code: Pick<VoucherInterface, 'code'>
) => {
	const user = await User.findById(userId);
	user.addVoucher(code);
	const voucher = await findVoucher(code);
	await (
		await voucherModel.findOneAndUpdate(
			{ code },
			{ $set: { used: true, user: user._id } }
		)
	).save();
	await saveUser(user);
	return user;
};

export default {
	createUser,
	saveUser,
	deleteUser,
	findUser,
	findUserById,
	setPassword,
	addReading,
	useVoucher
};
