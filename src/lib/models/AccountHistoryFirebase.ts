import HistoryItem from '$lib/classes/HistoryItem';
import { db } from '$lib/firebase';
import type { historyType } from '$lib/types';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import type { saveDataDto } from './accountModel';

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

	static async save(data: saveDataDto): Promise<boolean> {
		try {
			const docRef = await addDoc(collection(db, 'history'), data);
			console.log('Document written with ID: ', docRef.id);
			return true;
		} catch (e) {
			console.error('Error adding document: ', e);
			return false;
		}
	}

	static async update(dataToUpdate: updateDataDto) {
		// TODO
	}

	static async delete(id: number) {
		// TODO
	}
}
