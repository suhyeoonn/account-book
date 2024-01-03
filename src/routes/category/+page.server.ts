import { CategoryModel } from '$lib/models/CategoryModel';

export async function load() {
	return {
		categoryList: await new CategoryModel().getAllCategory()
	};
}
