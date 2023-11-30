<script lang="ts">
	import type { historyType } from '$lib/types';
	import AccountHistoryHeader from './AccountHistoryHeader.svelte';
	import AccountHistoryItem from './AccountHistoryItem.svelte';

	export let historyOfDay: historyType[];
</script>

<div class="bg-white p-2">
	<AccountHistoryHeader date={new Date(historyOfDay[0].date)} />
	<ul>
		<!-- TODO 수정 페이지로 이동 -->
		{#each historyOfDay as historyItem}
			<AccountHistoryItem history={historyItem} on:delete />
		{/each}
	</ul>
</div>
