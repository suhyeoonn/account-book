import { CategoryModel } from '$lib/models/CategoryModel';
import { json } from '@sveltejs/kit';

export async function GET() {
	const categoryModel = new CategoryModel();
	const data = await categoryModel.getAllCategory();
	return json(data);
}
