<script lang="ts">
	import { accountType, type historyType } from '$lib/types';
	import AccountHistoryHeader from './AccountHistoryHeader.svelte';
	import AccountHistoryItem from './AccountHistoryItem.svelte';

	export let historyOfDay: historyType[];

	function getTotal(type: number) {
		return historyOfDay
			.filter((h) => h.type === type)
			.reduce((sum, h) => sum + h.amount, 0)
			.toLocaleString('ko-KR');
	}
</script>

<div class="bg-white p-2">
	<AccountHistoryHeader
		date={new Date(historyOfDay[0].date)}
		inputTotal={getTotal(accountType.INPUT)}
		outputTotal={getTotal(accountType.OUTPUT)}
	/>
	<ul>
		{#each historyOfDay as historyItem}
			<AccountHistoryItem history={historyItem} on:delete />
		{/each}
	</ul>
</div>
