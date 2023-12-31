export enum accountType {
	INPUT,
	OUTPUT
}

export interface historyType {
	id: number;
	date: string;
	type: number;
	detail: string;
	amount: number;
	category: number;
}
