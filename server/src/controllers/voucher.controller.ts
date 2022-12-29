import { NextFunction, Response } from 'express';
import {
	createVoucher,
	findAllVouchers,
	findVoucher,
	saveVoucher
} from '../services/voucher.service';
import RequestInterface from '../types/Request.interface';
import VoucherInterface from '../types/Voucher.interface';
import validateVoucherInput from '../validations/voucher.validation';

// Route to create a new voucher
export const postVoucher = async (
	req: RequestInterface,
	res: Response,
	next: NextFunction
) => {
	try {
		const { code, amount } = req.body;
		const { error } = validateVoucherInput({ code, amount });
		if (error) {
			throw new Error(error.details[0].message);
		}
		const newVoucher = await createVoucher(code, amount);
		await saveVoucher(newVoucher);
		res.send(newVoucher);
	} catch (e) {
		const { message }: any = e;
		res.status(400).json({ message });
	}
};

// Route to get all vouchers

export const getAllVoucher = async (
	req: RequestInterface,
	res: Response,
	next: NextFunction
) => {
	const allVoucher = await findAllVouchers();
	res.json({ vouchers: allVoucher });
};
export default {
	postVoucher,
	getAllVoucher
};

export const getVoucher = async (
	req: RequestInterface,
	res: Response,
	next: NextFunction
) => {
	try {
		const voucher = await findVoucher(req.params.code as any);
		res.json(voucher);
	} catch (e) {
		res.sendStatus(404);
	}
};
