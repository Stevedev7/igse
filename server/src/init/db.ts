import mongoose from 'mongoose';

const DB = process.env.DB || 'mongodb://localhost:27017/test';
const initDB = () => {
	mongoose
		.connect(DB)
		.then(() => console.log('Connected to db'))
		.catch((e) => console.log('Cannot connect'));
};

export { initDB };
