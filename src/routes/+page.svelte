<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import Alert from '$lib/components/Alert.svelte';
	import { accountType, type dataType } from '$lib/types';
	import { onMount } from 'svelte';

	let history: dataType[] = [];
	onMount(() => {
		history = LocalStorage.get();
	});

	const getAmount = (amount: number, type: accountType) => {
		return `${type === accountType.INPUT ? '+' : '-'}${amount}원`;
	};

	const getAmountClass = (type: accountType) => {
		return type === accountType.INPUT ? 'text-red-500' : 'text-blue-500';
	};
</script>

<h1>거래 내역 페이지</h1>
{#if history.length < 1}
	<Alert message="거래내역을 추가하세요." />
{:else}
	<ul>
		{#each history as { date, detail, amount, type }}
			<li class="grid grid-cols-3 text-gray-500 p-2">
				<span>{date}</span>
				<span class="text-gray-800">{detail}</span>
				<span class={getAmountClass(type)}>{getAmount(amount, type)}</span>
			</li>
		{/each}
	</ul>
{/if}
