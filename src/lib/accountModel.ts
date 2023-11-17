export interface saveDataDto {
	date: string;
	type: number;
	detail: string;
	amount: number;
}

export interface accountModel {
	save(data: saveDataDto): void;
	delete(id: number): void;
}
