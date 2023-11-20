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
	<!-- TODO 우측 하단으로 이동 -->
	<button
		class="btn btn-primary"
		on:click={() => {
			location.href = '/add';
		}}>추가</button
	>
</div>
<div class="flex justify-center">
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
