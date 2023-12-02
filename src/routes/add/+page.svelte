<script lang="ts">
	import { LocalStorage } from '$lib/LocalStorage';
	import { cateogryList } from '$lib/category';
	import { accountType } from '$lib/types';
	import type { accountModel } from '$lib/accountModel';
	import moment from 'moment';

	const model: accountModel = LocalStorage;

	let date = moment().format('YYYY-MM-DD');
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

		model.save({ date, type, detail, amount, category: Number(category) });
		location.href = '/';
	};

	const setType = (_type: accountType) => {
		type = _type;
		category = '0';
	};
</script>

<form class="flex flex-col gap-10" on:submit={onSubmit}>
	<div class="form-control w-full">
		<label class="label" for="date">
			<span class="label-text">날짜</span>
		</label>
		<input id="date" type="date" bind:value={date} required class="input input-bordered input-lg" />
	</div>
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
	<div class="form-control w-full">
		<label class="label" for="category">
			<span class="label-text">분류</span>
		</label>
		<select id="category" class="select select-bordered w-full" bind:value={category}>
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
			bind:value={amount}
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
			bind:value={detail}
			class="input input-bordered input-lg"
		/>
	</div>
	<button class="btn btn-primary">입력하기</button>
</form>
