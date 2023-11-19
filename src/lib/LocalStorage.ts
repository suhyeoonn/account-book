import type { saveDataDto } from './accountModel';
import type { historyType } from './types';

export class LocalStorage {
	static save(data: saveDataDto) {
		const savedData = LocalStorage.get();
		const id = savedData.length < 1 ? 1 : savedData.slice(-1)[0].id + 1;
		LocalStorage.setData(savedData.concat({ id, ...data }));
	}

	static get(): historyType[] {
		const jsonData = localStorage.getItem('data');
		return jsonData ? JSON.parse(jsonData) : [];
	}

	static setData(data: historyType[]) {
		localStorage.setItem('data', JSON.stringify(data));
	}

	static delete(id: number) {
		const savedData = LocalStorage.get();
		const filteredData = savedData.filter((data) => data.id !== id);
		LocalStorage.setData(filteredData);
	}
}
