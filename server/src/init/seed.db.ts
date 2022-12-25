import User from '../models/user.model';
import Reading from '../models/reading.model';
import { createUser } from '../services/user.service';
import { createReading } from '../services/reading.service';

const generateRandomNumber = (
	upperLimit: number,
	lowerLimitimit: number
): number => {
	return Math.floor(
		Math.random() * (upperLimit - lowerLimitimit) + lowerLimitimit
	);
};

const generateReadings = () => {
	return {
		dayReading: generateRandomNumber(100, 500),
		nightReading: generateRandomNumber(100, 500),
		gasReading: generateRandomNumber(1000, 5000)
	};
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
	}
];

const seed = async () => {
	await Reading.remove({});
	await User.remove({});

	users.forEach(async (user) => {
		let nuberOfReadings = generateRandomNumber(0, 5);
		let newUser = await createUser(user as any);
		await newUser.save();

		for (let i = 0; i < nuberOfReadings; i++) {
			let newReading = await createReading(
				{ ...generateReadings(), customer: newUser._id },
				newUser
			);
			await newReading.save();
		}
	});
};

export default seed;
