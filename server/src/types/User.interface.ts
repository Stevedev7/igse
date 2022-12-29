import { Document, Schema } from 'mongoose';
import VoucherInterface from './Voucher.interface';

export interface UserInterface extends Document {
	name: NameInterface;
	email: string;
	password: string;
	propertyType: PropertyType;
	address: AddressInterface;
	balance: number;
	bedrooms: number;
	isAdmin: boolean;
	readings: [Schema.Types.ObjectId];
	vouchers: [Pick<VoucherInterface, 'code'>];
	comparePassword(password: string): boolean;
	hashPassword(): Promise<string>;
	hidePassword(): void;
	addReading(id: Schema.Types.ObjectId): Schema.Types.ObjectId;
	addVoucher(
		code: Pick<VoucherInterface, 'code'>
	): Pick<VoucherInterface, 'code'>;
}
export enum PropertyType {
	DETACHED = 'detached',
	SEMI_DETACHED = 'semi-detached',
	TERRACED = 'terraced',
	FLAT = 'flat',
	COTTAGE = 'cottage',
	BUNGALOW = 'bungalow',
	MANSION = 'mansion'
}

export interface NameInterface {
	firstName: string;
	middleName: string;
	lastName: string;
}

export interface AddressInterface {
	firstLine: string;
	secondLine: string;
	city: string;
	postCode: string;
}

export default UserInterface;
