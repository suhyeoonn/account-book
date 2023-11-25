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
<!-- TODO 날짜별로 정렬 -->
<div class="flex flex-col justify-center gap-5 bg-gray-100">
	{#await promise}
		<span class="loading loading-spinner loading-lg" />
	{:then history}
		{#if history.length < 1}
			<Alert message="거래내역을 추가하세요." />
		{:else}
			<ul class="bg-white">
				<li>dummy</li>
			</ul>
			<div class="bg-white p-2">
				<h3 class="border-b pb-2 grid grid-cols-4 items-center">
					<div class="col-span-2">
						<span class="font-bold text-lg">18</span>
						<span>금요일</span>
						<span class="text-gray-500 text-sm">2033.11</span>
					</div>
					<span class="text-secondary text-center">0원</span>
					<span class="text-error text-center">100,000원</span>
				</h3>
				<ul>
					<!-- TODO 수정 페이지로 이동 -->
					{#each history as { id, date, category, amount, type }}
						<li class="grid grid-cols-4 text-gray-500 py-2">
							<span>{date}</span>
							<span class="text-gray-800">{getCategory(category)}</span>
							<span class={getAmountClass(type)}>{getAmount(amount, type)}</span>
							<button class="btn btn-ghost btn-xs text-white" on:click={() => onDelete(id)}>
								<span class="material-symbols-rounded text-error"> delete </span></button
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/await}
</div>
<button
	class="fixed bottom-0 my-5 shadow btn btn-circle btn-error drop-shadow self-end text-white"
	on:click={() => {
		location.href = '/add';
	}}
>
	<span class="material-symbols-rounded"> add </span>
</button>
