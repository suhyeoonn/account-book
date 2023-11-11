import type { dataType } from './types';

interface addDataDto {
	date: string;
	type: number;
	detail: string;
	amount: number;
}

export class LocalStorage {
	static add(data: addDataDto) {
		const savedData = LocalStorage.get();
		const id = savedData.length < 1 ? 1 : savedData.slice(-1)[0].id + 1;
		LocalStorage.save(savedData.concat({ id, ...data }));
	}

	static get(): dataType[] {
		const jsonData = localStorage.getItem('data');
		return jsonData ? JSON.parse(jsonData) : [];
	}

	static save(data: dataType[]) {
		localStorage.setItem('data', JSON.stringify(data));
	}

	static delete(id: number) {
		const savedData = LocalStorage.get();
		const filteredData = savedData.filter((data) => data.id !== id);
		LocalStorage.save(filteredData);
	}
}
