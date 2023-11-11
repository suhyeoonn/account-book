import type { dataType } from './types';

export class LocalStorage {
	static save(data: dataType) {
		localStorage.setItem('data', JSON.stringify(LocalStorage.get().concat(data)));
	}

	static get() {
		const jsonData = localStorage.getItem('data');
		return jsonData ? JSON.parse(jsonData) : [];
	}
}
