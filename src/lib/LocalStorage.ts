interface dataType {
	date: string;
	type: number;
	description: string;
	amount: number;
}
export class LocalStorage {
	static save(data: dataType) {
		const jsonData = localStorage.getItem('data');
		const savedData = jsonData ? JSON.parse(jsonData) : [];
		localStorage.setItem('data', JSON.stringify(savedData.concat(data)));
	}
}
