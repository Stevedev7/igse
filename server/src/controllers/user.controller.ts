import { format, subtract } from 'date-and-time';
import { NextFunction, Request, Response } from 'express';
import { createReading, setPaymentStatus } from '../services/reading.service';
import {
	createUser,
	findAllUsers,
	findUser,
	saveUser,
	setPassword,
	useVoucher
} from '../services/user.service';
import {
	createVoucher,
	findVoucher,
	saveVoucher
} from '../services/voucher.service';
import RequestInterface from '../types/Request.interface';
import VoucherInterface from '../types/Voucher.interface';
import { validateRegistrationInput } from '../validations/user.validation';
import { validateVoucherRedeemInput } from '../validations/voucher.validation';

export const postUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			name,
			password,
			email,
			bedrooms,
			address,
			propertyType,
			voucher
		} = req.body;

		const { error } = validateRegistrationInput(req.body);

		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		const user = await findUser('email', email);
		if (user == null) {
			const voucherError = validateVoucherRedeemInput({
				code: voucher
			}).error;
			if (voucherError) {
				throw new Error(voucherError.details[0].message);
			}
			const getVoucher = await findVoucher(voucher);

			if (getVoucher === null) {
				return res
					.status(404)
					.json({ error: 'Enter a valid energy voucher code' });
			}

			if (getVoucher.used) {
				return res
					.status(400)
					.json({ error: 'Energy voucher code already used' });
			}

			let newUser = await createUser({
				name,
				password,
				email,
				balance: getVoucher.amount,
				bedrooms,
				address,
				propertyType
			});
			await setPassword(newUser);
			await saveUser(newUser);

			newUser = await useVoucher(
				newUser._id,
				voucher as Pick<VoucherInterface, 'code'>
			);
			const date = format(new Date('2022-11-01'), 'YYYY-MM-DD');

			const reading = await createReading(
				{
					customer: newUser._id,
					dayReading: 0,
					gasReading: 0,
					nightReading: 0,
					bill: 0,
					date
				},
				newUser._id
			);

			await reading.save();
			await setPaymentStatus(reading._id);
			return res.json({ newUser });
		}

		throw new Error('User Exists');
	} catch ({ message }) {
		res.status(400).json({
			error: message
		});
	}
};

export const getUsers = async (req: RequestInterface, res: Response) => {
	try {
		const allUsers = await findAllUsers();
		res.json(allUsers);
	} catch (err) {
		res.json(err);
	}
};

export const topUpBalance = async (req: RequestInterface, res: Response) => {
	const { code } = req.body;

	const voucherError = validateVoucherRedeemInput({
		code
	}).error;
	if (voucherError) {
		throw new Error(voucherError.details[0].message);
	}
	const getVoucher = await findVoucher(code);

	if (getVoucher === null) {
		return res
			.status(404)
			.json({ error: 'Enter a valid energy voucher code' });
	}

	if (getVoucher.used) {
		return res
			.status(400)
			.json({ error: 'Energy voucher code already used' });
	}

	const user = await findUser('email', req.user.email);
	await useVoucher(user._id, code);
	user.balance += getVoucher.amount;

	await user.save();
	res.json('Topped up');
};

export const getUser = async (req: RequestInterface, res: Response) => {
	try {
		const user = await findUser('email', req.user.email);
		if (!user) {
			throw new Error('User not found');
		}
		res.json(user);
	} catch ({ message }) {
		res.status(404).json({ error: message });
	}
};

export default {
	postUser,
	getUsers,
	topUpBalance,
	getUser
};
