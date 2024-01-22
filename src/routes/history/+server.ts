import { AccountHistoryModel } from '$lib/models/AccountHistoryModel';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const year = url.searchParams.get('year');
	const month = url.searchParams.get('month');
	const data = await new AccountHistoryModel().get(Number(year), Number(month));
	return json(data);
}
