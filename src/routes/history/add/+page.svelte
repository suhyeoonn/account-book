<script lang="ts">
	import type { accountModel } from '$lib/models/accountModel';
	import type HistoryItem from '$lib/classes/HistoryItem';
	import HistoryItemForm from '$lib/components/HistoryItemForm.svelte';
	import { AccountHistoryFirebase } from '$lib/models/AccountHistoryFirebase';

	const firebase: accountModel = AccountHistoryFirebase;

	const onSubmit = async (data: HistoryItem) => {
		const result = await firebase.save({
			date: data.date,
			detail: data.detail,
			category: data.category,
			amount: data.amount,
			type: data.type
		});
		if (!result) {
			alert('error');
			return;
		}
		location.href = '/';
	};
</script>

<HistoryItemForm on:submit={({ detail }) => onSubmit(detail)} />
