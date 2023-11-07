<script lang="ts">
	enum accountType {
		INPUT,
		OUTPUT
	}

	let date = new Date().toISOString().substring(0, 10);
	let type = accountType.INPUT;
	let description = '';
	let amount = '';

	const onSubmit = (e: Event) => {
		e.preventDefault();
		console.log(date, type, description, amount);
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

	<input
		type="text"
		placeholder="설명"
		bind:value={description}
		class="input input-bordered input-lg"
	/>
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
