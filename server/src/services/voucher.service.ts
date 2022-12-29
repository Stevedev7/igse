import { Schema } from 'mongoose';
import Voucher from '../models/voucher.model';
import VoucherInterface from '../types/Voucher.interface';

export const createVoucher = async (code: string, amount: number) => {
	return new Voucher({ code, amount });
};

export const saveVoucher = async (voucher: VoucherInterface) =>
	await voucher.save();

export const findAllVouchers = async () => await Voucher.find({});

export const findVoucher = async (code: Pick<VoucherInterface, 'code'>) =>
	await Voucher.findOne({ code });

export const useVoucher = async (
	voucher: Pick<VoucherInterface, 'code'>,
	user: Schema.Types.ObjectId
) => {
	return {
		voucher,
		user
	};
};
export default {
	createVoucher,
	findAllVouchers
};
