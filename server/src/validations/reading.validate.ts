import ReadingInterface from '../types/Reading.interface';

export const validateReadings = (
	{
		day,
		night,
		gas
	}: {
		day: number;
		night: number;
		gas: number;
	},
	latest: ReadingInterface
): boolean =>
	(gas - latest.gasReading &&
		day - latest.dayReading &&
		night - latest.nightReading) > 0;

export default {
	validateReadings
};
