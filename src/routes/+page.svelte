<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import type { accountModel } from '$lib/accountModel';
	import { cateogryList } from '$lib/category';
	import Alert from '$lib/components/Alert.svelte';
	import { accountType, type historyType } from '$lib/types';
	import { onMount } from 'svelte';

	const model: accountModel = LocalStorage;

	let history: historyType[] = [];
	onMount(() => {
		setHistory();
	});

	const setHistory = () => {
		history = model.get();
	};

	const getAmount = (amount: number, type: accountType) => {
		return `${type === accountType.INPUT ? '+' : '-'}${amount.toLocaleString('ko-KR')}원`;
	};

	const getAmountClass = (type: accountType) => {
		return type === accountType.INPUT ? 'text-blue-500' : 'text-red-500';
	};

	const onDelete = (id: number) => {
		if (!confirm('삭제하시겠습니까?')) {
			return;
		}
		model.delete(id);
		setHistory();
	};

	const getCategory = (category: number) => {
		return cateogryList.find((c) => c.id === category)?.name;
	};
</script>

<div class="flex justify-between">
	<h1>거래 내역 페이지</h1>
	<button
		class="btn btn-primary"
		on:click={() => {
			location.href = '/add';
		}}>추가</button
	>
</div>
<!-- TODO Loading -->
{#if history.length < 1}
	<Alert message="거래내역을 추가하세요." />
{:else}
	<ul>
		{#each history as { id, date, category, amount, type }}
			<li class="grid grid-cols-4 text-gray-500 p-2">
				<span>{date}</span>
				<span class="text-gray-800">{getCategory(category)}</span>
				<span class={getAmountClass(type)}>{getAmount(amount, type)}</span>
				<button class="btn btn-error btn-xs" on:click={() => onDelete(id)}>remove</button>
			</li>
		{/each}
	</ul>
{/if}
