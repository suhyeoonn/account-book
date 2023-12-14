<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import type { accountModel } from '$lib/accountModel';
	import HistoryItem from '$lib/classes/HistoryItem';
	import HistoryItemForm from '$lib/components/HistoryItemForm.svelte';

	const model: accountModel = LocalStorage;

	const fetchData = async () => {
		return await model.getById(15); // TODO: 동적으로 변경
	};
	let promise = fetchData();

	const onSubmit = (data: HistoryItem) => {
		const { id, date, type, detail, amount, category } = data;
		model.update({ id, date, type, detail, amount, category });
		location.href = '/';
	};
</script>

{#await promise}
	loading...
{:then data}
	<HistoryItemForm data={new HistoryItem(data)} on:submit={({ detail }) => onSubmit(detail)} />
{/await}
