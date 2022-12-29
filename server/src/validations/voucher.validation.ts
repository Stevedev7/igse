import Joi from 'joi';
import VoucherInterface from '../types/Voucher.interface';
export const validateVoucherInput = (
	voucher: Pick<VoucherInterface, 'code' | 'amount'>
) => {
	const schema = Joi.object({
		code: Joi.string().length(8).required(),
		amount: Joi.number().default(200)
	});

	return schema.validate(voucher);
};

export const validateVoucherRedeemInput = (
	voucher: Pick<VoucherInterface, 'code'>
) => {
	const schema = Joi.object({
		code: Joi.string().length(8).required()
	});

	return schema.validate(voucher);
};

export default validateVoucherInput;
