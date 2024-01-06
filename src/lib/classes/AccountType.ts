export class AccountType {
	// TODO class에서 enum 정의하려면?
	static INPUT = 0;
	static OUTPUT = 1;

	static isInputType(type: number) {
		return type === AccountType.INPUT;
	}

	static isOutputType(type: number) {
		return type === AccountType.OUTPUT;
	}
}
