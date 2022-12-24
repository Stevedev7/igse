import Joi from 'joi';
import { UserInterface } from '../models/user.model';

export const validateLoginInput = (
	user: Pick<UserInterface, 'email' | 'password'>
) => {
	const schema = Joi.object({
		email: Joi.string().min(5).max(128).email().required(),
		password: Joi.string().min(8).max(2048).required()
	});

	return schema.validate(user);
};

export default {
	validateLoginInput
};
