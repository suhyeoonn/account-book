import moment from 'moment';
import { cateogryList } from '$lib/category';
import { accountType } from '$lib/types';

export default class HistoryItem {
	#date;
	#type;
	#detail;
	#amount;
	#category;
	constructor(
		data = {
			date: moment().format('YYYY-MM-DD'),
			type: accountType.INPUT,
			detail: '',
			amount: 0,
			category: 0
		}
	) {
		const { date, type, detail, amount, category } = data;
		this.#date = date;
		this.#type = type;
		this.#detail = detail;
		this.#amount = amount;
		this.#category = category;
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

	get categoryOptions() {
		return cateogryList.filter((c) => c.type === this.#type);
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
