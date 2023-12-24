<script lang="ts">
	import { AccountHistoryModel } from '$lib/models/AccountHistoryModel';
	import type { accountModel } from '$lib/models/accountModel';
	import type HistoryItem from '$lib/classes/HistoryItem';
	import HistoryItemForm from '$lib/components/HistoryItemForm.svelte';

	const model: accountModel = AccountHistoryModel;

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
