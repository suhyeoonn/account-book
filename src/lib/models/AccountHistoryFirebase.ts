import { db } from '$lib/firebase';
import type { historyType } from '$lib/types';
import { collection, getDocs } from 'firebase/firestore';

export class AccountHistoryFirebase {
	static async get(year: number, month: number): Promise<historyType[]> {
		const querySnapshot = await getDocs(collection(db, 'history'));
		let data: historyType[] = [];
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			const { id, date, type, detail, amount, category } = doc.data();
			data.push({ id, date, type, detail, amount, category });
		});
		return data;
	}

	static async getById(id: number): Promise<historyType> {
		// TODO
		return [];
	}

	static async save(data: saveDataDto) {
		// TODO
	}

	static async update(dataToUpdate: updateDataDto) {
		// TODO
	}

	static async delete(id: number) {
		// TODO
	}
}
