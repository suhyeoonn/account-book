<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import type { accountModel } from '$lib/accountModel';
	import Alert from '$lib/components/Alert.svelte';
	import MonthController from '$lib/components/MonthController.svelte';
	import HistoryOfDayList from '$lib/components/HistoryOfDayList.svelte';
	import { month, year } from '../stores/accountHistory';
	import type { historyType } from '$lib/types';

	const model: accountModel = LocalStorage;

	const fetchHistory = async () => {
		const data = await model.get($year, $month);
		const tmp = data.reduce((pre, cur) => {
			if (pre.length > 0) {
				const lastEl = pre.slice(-1)[0];
				if (lastEl[0].date === cur.date) {
					lastEl.push(cur);
				} else {
					pre.push([cur]);
				}
			} else {
				pre.push([cur]);
			}
			return pre;
		}, []);
		console.log(tmp);
		return tmp;
	};

	let promise: Promise<historyType[][]>;
	month.subscribe(() => {
		promise = fetchHistory();
	});

	const onDelete = async (id: number) => {
		if (!confirm('삭제하시겠습니까?')) {
			return;
		}

		try {
			await model.delete(id);
			promise = fetchHistory();
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div class="flex justify-between">
	<h1>거래 내역 페이지</h1>
</div>
<MonthController />
<!-- TODO 월별 수입/지출 합계 표시 -->
<div class="flex flex-col justify-center gap-5 bg-gray-100">
	{#await promise}
		<span class="loading loading-spinner loading-lg" />
	{:then history}
		{#if history.length < 1}
			<Alert message="거래내역을 추가하세요." />
		{:else}
			{#each history as historyOfDay}
				<HistoryOfDayList {historyOfDay} on:delete={({ detail: id }) => onDelete(id)} />
			{/each}
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
