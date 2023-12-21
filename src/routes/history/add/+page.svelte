<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import type { accountModel } from '$lib/accountModel';
	import type HistoryItem from '$lib/classes/HistoryItem';
	import HistoryItemForm from '$lib/components/HistoryItemForm.svelte';

	const model: accountModel = LocalStorage;

	const onSubmit = (data: HistoryItem) => {
		model.save({
			date: data.date,
			detail: data.detail,
			category: data.category,
			amount: data.amount,
			type: data.type
		});
		location.href = '/';
	};
</script>

<HistoryItemForm on:submit={({ detail }) => onSubmit(detail)} />
