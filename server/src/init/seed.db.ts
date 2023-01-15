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
		email: 'michael.lawson@reqres.in',
		password: 'password',
		confirm: 'password',
		name: {
			firstName: 'Michael',
			lastName: 'Lawson'
		},
		address: {
			firstLine: 'The Cross',
			secondLine: '8',
			city: 'Cheshire',
			postCode: 'CH64 9UB'
		},
		bedrooms: generateRandomNumber(1, 10),
		propertyType: properties[generateRandomNumber(0, 7)]
	},
	{
		email: 'lindsay.ferguson@reqres.in',
		password: 'password',
		confirm: 'password',
		name: {
			firstName: 'Lindsay',
			lastName: 'Ferguson'
		},
		address: {
			firstLine: '69',
			secondLine: 'Albion St',
			city: 'Glasgow',
			postCode: 'G1 1PA'
		},
		bedrooms: generateRandomNumber(1, 10),
		propertyType: properties[generateRandomNumber(0, 7)]
	},
	{
		email: 'tobias.funke@reqres.in',
		password: 'password',
		confirm: 'password',
		name: {
			firstName: 'Tobias',
			lastName: 'Funke'
		},
		address: {
			firstLine: '3',
			secondLine: 'Whitecroft Way',
			city: 'Beckenham',
			postCode: 'BR3 3AQ'
		},
		bedrooms: generateRandomNumber(1, 10),
		propertyType: properties[generateRandomNumber(0, 7)]
	},
	{
		email: 'byron.fields@reqres.in',
		password: 'password',
		confirm: 'password',
		name: {
			firstName: 'Byron',
			lastName: 'Fields'
		},
		address: {
			firstLine: '32 St',
			secondLine: 'Andrews Crescent',
			city: 'Glasgow',
			postCode: 'G41 1PF'
		},
		bedrooms: generateRandomNumber(1, 10),
		propertyType: properties[generateRandomNumber(0, 7)]
	},
	{
		email: 'george.edwards@reqres.in',
		password: 'password',
		confirm: 'password',
		name: {
			firstName: 'George',
			lastName: 'Edwards'
		},
		address: {
			firstLine: '1',
			secondLine: ' King William St',
			city: 'Coventry',
			postCode: 'CV1 5JD'
		},
		bedrooms: generateRandomNumber(1, 10),
		propertyType: properties[generateRandomNumber(0, 7)]
	},
	{
		email: 'rachel.howell@reqres.in',
		password: 'password',
		confirm: 'password',
		name: {
			firstName: 'Rachel',
			lastName: 'Howell'
		},
		address: {
			firstLine: '23 Leicester Rd',
			city: 'Loughborough',
			postCode: 'LE11 2AE'
		},
		bedrooms: generateRandomNumber(1, 10),
		propertyType: properties[generateRandomNumber(0, 7)]
	},
	{
		email: 'pinto_steve@yahoo.com',
		password: 'password',
		confirm: 'password',
		name: {
			firstName: 'Brian',
			middleName: 'Steve',
			lastName: 'Pinto'
		},
		bedrooms: 6,
		propertyType: 'flat',
		address: {
			firstLine: 'Flat 3 Jayhouse',
			secondLine: '88-90 London Road',
			city: 'Leicester',
			postCode: 'LE20RD'
		}
	},
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
				date: '2022-12-25'
			},
			newUser
		);
		await newReading.save();
	});
};

export default seed;
