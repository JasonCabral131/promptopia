/** @format */

import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request) => {
	try {
		const url = new URL(request.url);
		const search = url.searchParams.get('search');

		let filters = {};
		if (!!search) {
			filters = {
				$or: [
					{ tag: { $regex: search, $options: 'i' } },
					{ prompt: { $regex: search, $options: 'i' } },
					{ 'creator.username': { $regex: search, $options: 'i' } },
				],
			};
		}

		await connectToDB();

		const prompts = await Prompt.aggregate([
			{
				$lookup: {
					from: 'users', // replace with the actual name of the User collection
					localField: 'creator',
					foreignField: '_id',
					as: 'creator',
				},
			},
			{
				$unwind: '$creator', // unwind to transform the creator array to a single object
			},
			{
				$match: filters,
			},
		]);
		return new Response(JSON.stringify(prompts), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response('Failed to fetch All Prompt', {
			status: 500,
		});
	}
};
