<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import { accountType } from '$lib/types';

	let date = new Date().toISOString().substring(0, 10);
	let type = accountType.INPUT;
	let detail = '';
	let amount = 0;

	const onSubmit = (e: Event) => {
		e.preventDefault();

		if (amount < 1) {
			alert('금액을 입력하세요.');
			return;
		}

		LocalStorage.save({ date, type, detail, amount });
	};

	const setType = (_type: accountType) => {
		type = _type;
	};
</script>

<form class="flex flex-col gap-10" on:submit={onSubmit}>
	<input type="date" bind:value={date} required class="input input-bordered input-lg" />
	<div class="btn-group">
		<button
			type="button"
			class="btn"
			class:btn-active={type === accountType.INPUT}
			on:click={() => setType(accountType.INPUT)}
		>
			들어온 돈
		</button>
		<button
			type="button"
			class="btn"
			class:btn-active={type === accountType.OUTPUT}
			on:click={() => setType(accountType.OUTPUT)}
		>
			나간 돈
		</button>
	</div>

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
