<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import type { accountModel } from '$lib/accountModel';
	import { cateogryList } from '$lib/category';
	import Alert from '$lib/components/Alert.svelte';
	import { accountType } from '$lib/types';

	const model: accountModel = LocalStorage;

	const fetchHistory = async () => {
		return await model.get();
	};

	let promise = fetchHistory();

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
		fetchHistory();
	};

	const getCategory = (category: number) => {
		return cateogryList.find((c) => c.id === category)?.name;
	};
</script>

<div class="flex justify-between">
	<h1>거래 내역 페이지</h1>
</div>
<div class="flex justify-center flex-1">
	{#await promise}
		<span class="loading loading-spinner loading-lg" />
	{:then history}
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
	{/await}
</div>
<button
	class="shadow btn btn-circle btn-error drop-shadow self-end"
	on:click={() => {
		location.href = '/add';
	}}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M6 18L18 6M6 6l12 12"
		/></svg
	>
</button>
