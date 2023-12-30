import moment from 'moment';
import { AccountType } from './AccountType';

export default class HistoryItem {
	#id;
	#date;
	#type: AccountType;
	#detail;
	#amount;
	#category;
	constructor(
		data = {
			id: 0,
			date: moment().format('YYYY-MM-DD'),
			type: AccountType.INPUT,
			detail: '',
			amount: 0,
			category: 0
		}
	) {
		const { id, date, type, detail, amount, category } = data;
		this.#id = id;
		this.#date = date;
		this.#type = new AccountType(type);
		this.#detail = detail;
		this.#amount = amount;
		this.#category = category;
	}

	get id() {
		return this.#id;
	}

	get date() {
		return this.#date;
	}

	get type() {
		return this.#type;
	}

	set type(type: accountType) {
		this.#type = type;
		this.category = '0';
	}

	get detail() {
		return this.#detail;
	}

	get amount() {
		return this.#amount;
	}

	set amount(amount: number) {
		this.#amount = amount;
	}

	set detail(detail: string) {
		this.#detail = detail;
	}

	get category(): number {
		return this.#category;
	}

	set category(value: string) {
		this.#category = Number(value);
	}

	validate() {
		if (!this.#category) {
			alert('분류를 선택하세요.');
			return false;
		}

		if (this.#amount < 1) {
			alert('금액을 입력하세요.');
			return false;
		}

		return true;
	}
}
