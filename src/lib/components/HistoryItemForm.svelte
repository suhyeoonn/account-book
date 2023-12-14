<script lang="ts">
	import { accountType } from '$lib/types';
	import HistoryItem from '$lib/classes/HistoryItem';
	import { createEventDispatcher } from 'svelte';

	export let data: HistoryItem = new HistoryItem();

	$: categoryOptions = data.categoryOptions;

	const dispatch = createEventDispatcher();

	const onSubmit = (e: Event) => {
		e.preventDefault();
		if (!data.validate()) return;
		dispatch('submit', data);
	};
</script>

<form class="flex flex-col gap-10" on:submit={onSubmit}>
	<div class="form-control w-full">
		<label class="label" for="date">
			<span class="label-text">날짜</span>
		</label>
		<input
			id="date"
			type="date"
			bind:value={data.date}
			required
			class="input input-bordered input-lg"
		/>
	</div>
	<div class="join">
		<button
			type="button"
			class="btn join-item"
			class:btn-secondary={data.type === accountType.INPUT}
			on:click={() => (data.type = accountType.INPUT)}
		>
			들어온 돈
		</button>
		<button
			type="button"
			class="btn join-item"
			class:btn-accent={data.type === accountType.OUTPUT}
			on:click={() => (data.type = accountType.OUTPUT)}
		>
			나간 돈
		</button>
	</div>
	<div class="form-control w-full">
		<label class="label" for="category">
			<span class="label-text">분류</span>
		</label>
		<select id="category" class="select select-bordered w-full" bind:value={data.category}>
			<option disabled value="0">분류 선택</option>
			{#each categoryOptions as { id, name }}
				<option value={id}>{name}</option>
			{/each}
		</select>
	</div>
	<!-- TODO 0 입력되어 있지 않도록 수정 -->
	<div class="form-control w-full">
		<label class="label" for="amount">
			<span class="label-text">금액</span>
		</label>
		<input
			id="amount"
			type="number"
			placeholder="금액"
			bind:value={data.amount}
			required
			class="input input-bordered input-lg"
			min="0"
		/>
	</div>
	<div class="form-control w-full">
		<label class="label" for="detail">
			<span class="label-text">설명</span>
		</label>
		<input
			id="detail"
			type="text"
			placeholder="설명"
			bind:value={data.detail}
			class="input input-bordered input-lg"
		/>
	</div>
	<button class="btn btn-primary">저장하기</button>
</form>
