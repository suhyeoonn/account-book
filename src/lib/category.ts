import { AccountType } from './classes/AccountType';
import type { cateogryType } from './types';

// TODO 사용중인 곳을 CategoryModel로 변경 및 제거
export const cateogryList: cateogryType[] = [
	{ id: 1, name: '💰 월급', type: AccountType.INPUT },
	{ id: 2, name: '📈 부수입', type: AccountType.INPUT },
	{ id: 3, name: '👶 아동수당', type: AccountType.INPUT },
	{ id: 4, name: '🪙 용돈', type: AccountType.INPUT },
	{ id: 5, name: '🧧 상여', type: AccountType.INPUT },
	{ id: 6, name: '🏠 생활비', type: AccountType.OUTPUT },
	{ id: 8, name: '🚘 교통/차량', type: AccountType.OUTPUT },
	{ id: 9, name: '📞 주거/통신', type: AccountType.OUTPUT },
	{ id: 10, name: '💊 건강', type: AccountType.OUTPUT }
];
