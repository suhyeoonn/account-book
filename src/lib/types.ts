export enum accountType {
	INPUT,
	OUTPUT
}

export interface dataType {
	id: number;
	date: string;
	type: number;
	detail: string;
	amount: number;
}

export interface cateogryType {
	id: number;
	name: string;
	type: accountType;
}
