export class AccountType {
	// TODO class에서 enum 정의하려면?
	static INPUT = 0;
	static OUTPUT = 1;

	#type;
	constructor(type: number) {
		this.#type = type;
	}
	isInputType() {
		return this.#type === AccountType.INPUT;
	}

	isOutputType() {
		return this.#type === AccountType.OUTPUT;
	}

	set type(type: number) {
		this.#type = type;
	}

	get type() {
		return this.#type;
	}

	get typeName() {
		return this.isInputType() ? '수입' : '지출';
	}
}
