<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import type { accountModel } from '$lib/accountModel';
	import HistoryItem from '$lib/classes/HistoryItem';
	import HistoryItemForm from '$lib/components/HistoryItemForm.svelte';

	const model: accountModel = LocalStorage;

	const fetchData = async () => {
		return await model.getById(3);
	};
	let promise = fetchData();
</script>

{#await promise}
	loading...
{:then data}
	<HistoryItemForm data={new HistoryItem(data)} />
{/await}
