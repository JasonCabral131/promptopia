/** @format */

import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery');

	if (isConnected) {
		console.log('MongoDB already Connection');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share_prompt',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log('Mongodb Connected');
	} catch (error) {
		console.log(JSON.stringify(useNewUrlParse, null, 2));
	}
};
