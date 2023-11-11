export enum accountType {
	INPUT,
	OUTPUT
}

export interface dataType {
	date: string;
	type: number;
	detail: string;
	amount: number;
}
