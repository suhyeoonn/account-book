import { CategoryModel } from '$lib/models/CategoryModel.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const type = Number(data.get('type'));
		await new CategoryModel().save({ name, type });
		throw redirect(303, '/category');
	}
};
