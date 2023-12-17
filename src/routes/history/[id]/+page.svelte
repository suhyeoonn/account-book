<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import type { accountModel } from '$lib/accountModel';
	import HistoryItem from '$lib/classes/HistoryItem';
	import HistoryItemForm from '$lib/components/HistoryItemForm.svelte';

	export let data;

	const model: accountModel = LocalStorage;

	const fetchData = async () => {
		return await model.getById(Number(data.id));
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
