<script lang="ts">
	import { AccountHistoryModel } from '$lib/models/AccountHistoryModel';
	import type { accountModel } from '$lib/models/accountModel';
	import Alert from '$lib/components/Alert.svelte';
	import MonthController from '$lib/components/MonthController.svelte';
	import HistoryOfDayList from '$lib/components/HistoryOfDayList.svelte';
	import { month, year } from '../stores/accountHistory';
	import { AccountHistoryFirebase } from '$lib/models/AccountHistoryFirebase';
	import type { historyType } from '$lib/types';

	const model: accountModel = AccountHistoryModel;
	const firebase = AccountHistoryFirebase;

	let inputTotal = 0,
		outputTotal = 0,
		result = 0;
	const fetchHistory = async () => {
		const data = await firebase.get($year, $month);

		inputTotal = data
			.filter((d) => d.type.isInputType(d.type))
			.reduce((pre, cur) => pre + cur.amount, 0);

		outputTotal = data
			.filter((d) => d.type.isOutputType(d.type))
			.reduce((pre, cur) => pre + cur.amount, 0);

		result = inputTotal - outputTotal;

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
	<button
		class="shadow btn btn-circle bg-base-300 drop-shadow self-end text-white"
		on:click={() => {
			location.href = '/category';
		}}
	>
		<span class="material-symbols-rounded"> settings </span>
	</button>
</div>
<MonthController />
{#await promise}
	<span class="loading loading-spinner loading-lg" />
{:then history}
	<!-- TODO 수입, 지출 색상 변경 -->
	<div class="grid grid-cols-3">
		<div>수입</div>
		<div>지출</div>
		<div>합계</div>
		<div>{inputTotal.toLocaleString('ko-KR')}원</div>
		<div>{outputTotal.toLocaleString('ko-KR')}원</div>
		<div>{result.toLocaleString('ko-KR')}원</div>
	</div>
	<div class="flex flex-col justify-center gap-5 bg-gray-100">
		{#if history.length < 1}
			<Alert message="거래내역을 추가하세요." />
		{:else}
			{#each history as historyOfDay}
				<HistoryOfDayList {historyOfDay} on:delete={({ detail: id }) => onDelete(id)} />
			{/each}
		{/if}
	</div>
{/await}
<button
	class="fixed bottom-0 my-5 shadow btn btn-circle btn-error drop-shadow self-end text-white"
	on:click={() => {
		location.href = '/history/add';
	}}
>
	<span class="material-symbols-rounded"> add </span>
</button>
