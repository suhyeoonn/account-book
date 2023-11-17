<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import { cateogryList } from '$lib/category';
	import { accountType } from '$lib/types';
	import type { accountModel } from '$lib/accountModel';

	const model: accountModel = LocalStorage;

	let date = new Date().toISOString().substring(0, 10);
	let type = accountType.INPUT;
	let detail = '';
	let amount = 0;
	let category = '0';

	$: categoryOptions = cateogryList.filter((c) => c.type === type);

	const onSubmit = (e: Event) => {
		e.preventDefault();

		if (!category) {
			alert('분류를 선택하세요.');
			return;
		}

		if (amount < 1) {
			alert('금액을 입력하세요.');
			return;
		}

		// TODO category 전달
		model.save({ date, type, detail, amount });
		location.href = '/';
	};

	const setType = (_type: accountType) => {
		type = _type;
		category = '0';
	};
</script>

<!-- TODO label -->
<form class="flex flex-col gap-10" on:submit={onSubmit}>
	<input type="date" bind:value={date} required class="input input-bordered input-lg" />
	<div class="join">
		<button
			type="button"
			class="btn join-item"
			class:btn-secondary={type === accountType.INPUT}
			on:click={() => setType(accountType.INPUT)}
		>
			들어온 돈
		</button>
		<button
			type="button"
			class="btn join-item"
			class:btn-accent={type === accountType.OUTPUT}
			on:click={() => setType(accountType.OUTPUT)}
		>
			나간 돈
		</button>
	</div>
	<select class="select select-bordered w-full max-w-xs" bind:value={category}>
		<option disabled value="0">분류</option>
		{#each categoryOptions as { id, name }}
			<option value={id}>{name}</option>
		{/each}
	</select>
	<input type="text" placeholder="설명" bind:value={detail} class="input input-bordered input-lg" />
	<input
		type="number"
		placeholder="금액"
		bind:value={amount}
		required
		class="input input-bordered input-lg"
		min="0"
	/>
	<button class="btn btn-primary">입력하기</button>
</form>
