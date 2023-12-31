export class Category {
	#id;
	#name;
	#type;
	constructor(id: number, name: string, type: number) {
		this.#id = id;
		this.#name = name;
		this.#type = type;
	}

	get type() {
		return this.#type;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}
}
