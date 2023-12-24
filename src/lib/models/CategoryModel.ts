import { accountType } from '$lib/types';

interface cateogryType {
	id: number;
	name: string;
	type: accountType;
}

export class CategoryModel {
	#category: cateogryType[] = [
		{ id: 1, name: '💰 월급', type: accountType.INPUT },
		{ id: 2, name: '📈 부수입', type: accountType.INPUT },
		{ id: 3, name: '👶 아동수당', type: accountType.INPUT },
		{ id: 4, name: '🪙 용돈', type: accountType.INPUT },
		{ id: 5, name: '🧧 상여', type: accountType.INPUT },
		{ id: 6, name: '🏠 생활비', type: accountType.OUTPUT },
		{ id: 8, name: '🚘 교통/차량', type: accountType.OUTPUT },
		{ id: 9, name: '📞 주거/통신', type: accountType.OUTPUT },
		{ id: 10, name: '💊 건강', type: accountType.OUTPUT }
	];

	async fetchCategory() {
		return this.#category;
	}
}
