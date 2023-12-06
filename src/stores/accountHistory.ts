import moment from 'moment';
import { writable } from 'svelte/store';

export const year = writable(moment().year());
export const month = writable(moment().month() + 1);

export const updateMonth = (gapMonth: number) => {
	const date = moment().add({ months: gapMonth });
	year.set(date.year());
	month.set(date.month() + 1);
};
