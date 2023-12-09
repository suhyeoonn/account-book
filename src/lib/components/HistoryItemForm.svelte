<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import { accountType } from '$lib/types';
	import type { accountModel } from '$lib/accountModel';
	import HistoryItem from '$lib/classes/HistoryItem';

	const model: accountModel = LocalStorage;
	const data = new HistoryItem();

	$: categoryOptions = data.categoryOptions;

	const onSubmit = (e: Event) => {
		e.preventDefault();
		if (!data.validate()) return;
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
	<button class="btn btn-primary">입력하기</button>
</form>
