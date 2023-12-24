import type { saveDataDto, updateDataDto } from './accountModel';
import type { historyType } from '../types';

export class AccountHistoryModel {
	static async save(data: saveDataDto) {
		const savedData = await AccountHistoryModel.getAllData();
		const id = savedData.length < 1 ? 1 : savedData.slice(-1)[0].id + 1;
		AccountHistoryModel.setData(savedData.concat({ id, ...data }));
	}

	static async get(year: number, month: number): Promise<historyType[]> {
		const data: historyType[] = await this.getAllData();
		return data.filter((d) => d.date.includes(`${year}-${month}`));
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
