import type { saveDataDto } from './accountModel';
import type { historyType } from './types';

export class LocalStorage {
	static async save(data: saveDataDto) {
		const savedData = await LocalStorage.get();
		const id = savedData.length < 1 ? 1 : savedData.slice(-1)[0].id + 1;
		LocalStorage.setData(savedData.concat({ id, ...data }));
	}

	static async get(): Promise<historyType[]> {
		const jsonData = localStorage.getItem('data');
		return jsonData ? JSON.parse(jsonData) : [];
	}

	static setData(data: historyType[]) {
		localStorage.setItem('data', JSON.stringify(data));
	}

	static async delete(id: number) {
		const savedData = await LocalStorage.get();
		const filteredData = savedData.filter((data) => data.id !== id);
		LocalStorage.setData(filteredData);
	}
}
