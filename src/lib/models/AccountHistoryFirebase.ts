import HistoryItem from '$lib/classes/HistoryItem';
import { db } from '$lib/firebase';
import type { historyType } from '$lib/types';
import { collection, getDocs } from 'firebase/firestore';

export class AccountHistoryFirebase {
	static async get(year: number, month: number): Promise<HistoryItem[]> {
		const querySnapshot = await getDocs(collection(db, 'history'));
		let data: HistoryItem[] = [];
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			const { id, date, type, detail, amount, category } = doc.data();
			data.push(new HistoryItem({ id, date, type, detail, amount, category }));
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
