<script lang="ts">
	import { accountType } from '$lib/types';

	const history = [
		{
			date: '2022-11-09',
			detail: '내용',
			type: 0,
			amount: 10000
		},
		{
			date: '2022-11-09',
			detail: '내용',
			type: 0,
			amount: 10000
		},
		{
			date: '2022-11-09',
			detail: '내용',
			type: 1,
			amount: 10000
		}
	];

	const getAmount = (amount: number, type: accountType) => {
		return `${type === accountType.INPUT ? '+' : '-'}${amount}원`;
	};

	const getAmountClass = (type: accountType) => {
		return type === accountType.INPUT ? 'text-red-500' : 'text-blue-500';
	};
</script>

<h1>거래 내역 페이지</h1>
<ul>
	{#each history as { date, detail, amount, type }}
		<li class="grid grid-cols-3 text-gray-500 p-2">
			<span>{date}</span>
			<span class="text-gray-800">{detail}</span>
			<span class={getAmountClass(type)}>{getAmount(amount, type)}</span>
		</li>
	{/each}
</ul>
