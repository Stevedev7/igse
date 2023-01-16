import User from '../models/user.model';
import Reading from '../models/reading.model';
import Voucher from '../models/voucher.model';
import { createUser, setPassword } from '../services/user.service';
import { createReading } from '../services/reading.service';
import { createVoucher, saveVoucher } from '../services/voucher.service';

const generateRandomNumber = (
	upperLimit: number,
	lowerLimitimit: number
): number => {
	return Math.floor(
		Math.random() * (upperLimit - lowerLimitimit) + lowerLimitimit
	);
};

const properties = [
	'detached',
	'semi-detached',
	'terraced',
	'flat',
	'cottage',
	'bungalow',
	'mansion'
];

const vouchers = new Set([
	'XTX2GZAD',
	'NDA7SY2V',
	'RVA7DZ2D',
	'DM8LEESR',
	'1DD33478',
	'75E1C449',
	'B0A5AB26',
	'3EC3D508',
	'339A9431',
	'91D88CB4',
	'388886FB',
	'B1D371EF',
	'9FF14719',
	'AB89D27C',
	'91DE3E8E',
	'B4CE430B',
	'32D10C6E',
	'446F1E30',
	'1E1165C7',
	'72B432BD',
	'32D10C6E',
	'B4CE430B'
]);

const users = [
	{
		email: 'gse@shangrila.gov.un',
		password: 'gse@energy',
		confirm: 'gse@energy',
		name: {
			firstName: 'GSE Admin',
			lastName: 'Shangrilla'
		},
		bedrooms: 5,
		propertyType: 'detached',
		address: {
			firstLine: '123 University Road',
			city: 'Leicester',
			postCode: 'LE23RD'
		},
		isAdmin: true,
		balance: 200
	},
	{
		email: 'test@gmail.com',
		password: '12345',
		confirm: '12345',
		name: {
			firstName: 'Test',
			lastName: 'User'
		},
		bedrooms: 3,
		balance: 200,
		propertyType: 'flat',
		address: {
			firstLine: '10 Victoria park road',
			city: 'Leicester',
			postCode: 'LE23RD'
		}
	}
];

const seed = async () => {
	await Voucher.remove({});
	await Reading.remove({});
	await User.remove({});
	console.log('Seeding initialized.');

	vouchers.forEach(async (voucher) => {
		const newVoucher = await createVoucher(voucher, 200);
		await saveVoucher(newVoucher);
		console.log(`Voucher: ${voucher} added.`);
	});
	users.forEach(async (user) => {
		let nuberOfReadings = generateRandomNumber(0, 5);
		let newUser = await createUser({
			...user,
			isAdmin: user.isAdmin
		} as any);
		await setPassword(newUser);
		await newUser.save();
		console.log(`User: ${newUser.email} saved.`);

		let newReading = await createReading(
			{
				dayReading: 0,
				nightReading: 0,
				gasReading: 0,
				customer: newUser._id,
				bill: 0,
				date: '2022-11-01'
			},
			newUser
		);
		await newReading.save();
	});
};

export default seed;
