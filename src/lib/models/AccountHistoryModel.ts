import type { saveDataDto, updateDataDto } from './accountModel';
import type { historyType } from '../types';
import { PrismaClient, type AccountHistory } from '@prisma/client';

export class AccountHistoryModel {
	#prisma;
	constructor() {
		this.#prisma = new PrismaClient();
	}
	async save(data: saveDataDto) {
		const { date, type, detail, amount, category } = data;
		try {
			await this.#prisma.accountHistory.create({
				data: { date, type, detail, amount, category }
			});
			await this.#prisma.$disconnect();
		} catch (e) {
			console.error(e);
			await this.#prisma.$disconnect();
		}
	}

	async get(year: number, month: number): Promise<AccountHistory[]> {
		const startDate = new Date(`${year}-${month}-01`);
		const endDate = new Date(`${year}-${month}-01`);
		endDate.setMonth(startDate.getMonth() + 1);

		return await this.#prisma.accountHistory.findMany({
			where: {
				date: {
					gte: startDate,
					lte: endDate
				}
			}
		});
	}

	static async update(dataToUpdate: updateDataDto) {
		const savedData = await AccountHistoryModel.getAllData();
		AccountHistoryModel.setData(
			savedData.map((d) => (d.id === dataToUpdate.id ? dataToUpdate : d))
		);
	}

	static async getById(id: number): Promise<historyType> {
		const savedData = await AccountHistoryModel.getAllData();
		const foundData = savedData.filter((data) => data.id === id);
		return foundData[0];
	}

	static async getAllData(): Promise<historyType[]> {
		const jsonData = localStorage.getItem('data');
		return jsonData ? JSON.parse(jsonData) : [];
	}

	static setData(data: historyType[]) {
		localStorage.setItem('data', JSON.stringify(data));
	}

	static async delete(id: number) {
		const savedData = await AccountHistoryModel.getAllData();
		const filteredData = savedData.filter((data) => data.id !== id);
		AccountHistoryModel.setData(filteredData);
	}
}
