<script lang="ts">
	import { cateogryList } from '$lib/category';
	import { accountType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let history;

	const { id, date, category, type, amount } = history;

	const getAmount = (amount: number, type: accountType) => {
		return `${type === accountType.INPUT ? '+' : '-'}${amount.toLocaleString('ko-KR')}원`;
	};

	const getAmountClass = (type: accountType) => {
		return type === accountType.INPUT ? 'text-blue-500' : 'text-red-500';
	};

	const getCategory = (category: number) => {
		return cateogryList.find((c) => c.id === category)?.name;
	};

	const dispatch = createEventDispatcher();
</script>

<li class="grid grid-cols-4 text-gray-500 py-2">
	<a href="/edit" class="grid grid-cols-3 col-span-3">
		<span>{date}</span>
		<span class="text-gray-800">{getCategory(category)}</span>
		<span class={getAmountClass(type)}>{getAmount(amount, type)}</span>
	</a>
	<button class="btn btn-ghost btn-xs text-white" on:click={() => dispatch('delete', id)}>
		<span class="material-symbols-rounded text-error"> delete </span></button
	>
</li>
