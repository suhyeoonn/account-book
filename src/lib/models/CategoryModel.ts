import { AccountType } from '$lib/classes/AccountType';
import type { Category } from '$lib/classes/Category';
import { db } from '$lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// TODO store에 카테고리 저장해서 한번만 불러오기
export interface getCateogryDto {
	id: number;
	name: string;
	type: number;
}

interface saveCateogryDto {
	name: string;
	type: number;
}

export class CategoryModel {
	#category: Category[];

	constructor() {
		this.#category = [];
	}
	async fetchCategory() {
		const categoryList: getCateogryDto[] = [
			{ id: 1, name: '💰 월급', type: AccountType.INPUT },
			{ id: 2, name: '📈 부수입', type: AccountType.INPUT },
			{ id: 3, name: '👶 아동수당', type: AccountType.INPUT },
			{ id: 4, name: '🪙 용돈', type: AccountType.INPUT },
			{ id: 5, name: '🧧 상여', type: AccountType.INPUT },
			{ id: 6, name: '🏠 생활비', type: AccountType.OUTPUT },
			{ id: 8, name: '🚘 교통/차량', type: AccountType.OUTPUT },
			{ id: 9, name: '📞 주거/통신', type: AccountType.OUTPUT },
			{ id: 10, name: '💊 건강', type: AccountType.OUTPUT }
		];
		return categoryList;
	}

	async getAllCategory() {
		const querySnapshot = await getDocs(collection(db, 'categories'));
		let data: getCateogryDto[] = [];
		querySnapshot.forEach((doc) => {
			const { id, name, type } = doc.data();
			data.push({ id, name, type });
		});
		return data;
	}

	async save(data: saveCateogryDto) {
		try {
			await addDoc(collection(db, 'categories'), data);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	// TODO store로 옮긴 후 제거
	get categoryList() {
		return this.#category;
	}

	getFilteredList(type: AccountType) {
		// TODO AccountType static 으로 변경하거나 제거하기
		return this.#category.filter((c) => c.type.type === type.type);
	}

	getCategoryName(category: number) {
		return this.#category.find((c) => c.id === category)?.name;
	}
}
