import { Request } from 'express';
import { Schema } from 'mongoose';
import {
	AddressInterface,
	NameInterface,
	PropertyType
} from './User.interface';

interface RequestInterface extends Request {
	user?: userType;
}

type userType = {
	email: string;
	_id: Schema.Types.ObjectId;
	name: NameInterface;
	address: AddressInterface;
	propertyType: PropertyType;
	balance: number;
	isAdmin: boolean;
	readings: [Schema.Types.ObjectId];
	bedrooms: number;
};

export default RequestInterface;
