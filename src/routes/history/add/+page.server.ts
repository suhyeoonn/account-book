import { AccountHistoryModel } from '$lib/models/AccountHistoryModel.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		await new AccountHistoryModel().save({
			date: new Date().toISOString(), //data.get('date') as string,
			detail: data.get('detail') as string,
			category: Number(data.get('category')),
			amount: Number(data.get('amount')),
			type: Number(data.get('type'))
		});
		redirect(302, '/category'); // TODO 리다이렉트 안됨
	}
};
