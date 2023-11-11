<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import Alert from '$lib/components/Alert.svelte';
	import { accountType, type dataType } from '$lib/types';
	import { onMount } from 'svelte';

	let history: dataType[] = [];
	onMount(() => {
		setHistory();
	});

	const setHistory = () => {
		history = LocalStorage.get();
	};

	const getAmount = (amount: number, type: accountType) => {
		return `${type === accountType.INPUT ? '+' : '-'}${amount}원`;
	};

	const getAmountClass = (type: accountType) => {
		return type === accountType.INPUT ? 'text-blue-500' : 'text-red-500';
	};

	const onDelete = (id: number) => {
		if (!confirm('삭제하시겠습니까?')) {
			return;
		}
		LocalStorage.delete(id);
		setHistory();
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
{#if history.length < 1}
	<Alert message="거래내역을 추가하세요." />
{:else}
	<ul>
		{#each history as { id, date, detail, amount, type }}
			<li class="grid grid-cols-4 text-gray-500 p-2">
				<span>{date}</span>
				<span class="text-gray-800">{detail}</span>
				<span class={getAmountClass(type)}>{getAmount(amount, type)}</span>
				<button class="btn btn-error btn-xs" on:click={() => onDelete(id)}>remove</button>
			</li>
		{/each}
	</ul>
{/if}
