import { AccountType } from '$lib/classes/AccountType';
import type { Category } from '$lib/classes/Category';
import { PrismaClient } from '@prisma/client';

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
	#prisma;

	constructor() {
		this.#category = [];
		this.#prisma = new PrismaClient();
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
		return await this.#prisma.category.findMany();
	}

	async save(data: saveCateogryDto) {
		try {
			await this.#prisma.category.create({
				data: {
					name: data.name,
					type: data.type
				}
			});
			await this.#prisma.$disconnect();
		} catch (e) {
			console.error(e);
			await this.#prisma.$disconnect();
		}
	}

	// TODO store로 옮긴 후 제거
	get categoryList() {
		return this.#category;
	}

	getFilteredList(type: number) {
		return this.#category.filter((c) => c.type === type);
	}

	getCategoryName(category: number) {
		return this.#category.find((c) => c.id === category)?.name;
	}
}
