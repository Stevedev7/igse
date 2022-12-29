import Joi, { ValidationOptions } from 'joi';
import UserInterface, { PropertyType } from '../types/User.interface';

export const validateLoginInput = (
	user: Pick<UserInterface, 'email' | 'password'>
) => {
	const schema = Joi.object({
		email: Joi.string()
			.min(5)
			.max(128)
			.email({
				tlds: {
					allow: ['com', 'net', 'in', 'uk', 'gov', 'co', 'org', 'un']
				}
			})
			.required(),
		password: Joi.string().min(5).max(2048).required()
	});

	return schema.validate(user);
};

export const validateRegistrationInput = ({
	confirm,
	voucher,
	...user
}: {
	user: Pick<
		UserInterface,
		'email' | 'password' | 'name' | 'propertyType' | 'bedrooms' | 'address'
	>;
	confirm: string;
	voucher: string;
}) => {
	const schema = Joi.object({
		email: Joi.string()
			.min(5)
			.max(128)
			.email({ tlds: { allow: false } })
			.required(),
		password: Joi.string().min(5).max(2048).required(),
		name: Joi.object({
			firstName: Joi.string().required().min(3).max(50),
			middleName: Joi.string().min(3).max(50),
			lastName: Joi.string().min(3).max(50)
		}),
		address: {
			firstLine: Joi.string().required(),
			secondLine: Joi.string(),
			city: Joi.string().required(),
			postCode: Joi.string().required()
		},
		bedrooms: Joi.number().required(),
		confirm: Joi.any().valid(Joi.ref('password')).required().messages({
			'any.only': 'Password and confirm password must match'
		}),
		propertyType: Joi.string()
			.valid(...Object.values(PropertyType))
			.required(),
		voucher: Joi.string().length(8).required()
	});

	return schema.validate({ ...user, confirm, voucher });
};

export default {
	validateLoginInput
};
