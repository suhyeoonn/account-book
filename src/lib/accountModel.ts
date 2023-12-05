import type { historyType } from './types';

export interface saveDataDto {
	date: string;
	type: number;
	detail: string;
	amount: number;
	category: number;
}

export interface accountModel {
	get(year: number, month: number): Promise<historyType[]>;
	save(data: saveDataDto): void;
	delete(id: number): Promise<void>;
}
