<script lang="ts">
	import HistoryItem from '$lib/classes/HistoryItem';
	import AccountTypeButtons from './\bAccountTypeButtons.svelte';

	// TODO 컴포넌트에 데이터만 받도록 수정
	export let data: HistoryItem = new HistoryItem();
	export let action = '?/create';

	let categoryList = [];
	const fetchCategory = async () => {
		const res = await fetch('/category');
		categoryList = await res.json();
		return categoryList;
	};

	const promise = fetchCategory();

	$: categoryOptions = categoryList.filter((c) => c.type === data.type);
</script>

{#await promise then}
	<form class="flex flex-col gap-10" {action} method="post">
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
				name="date"
			/>
		</div>

		<AccountTypeButtons bind:type={data.type} />

		<div class="form-control w-full">
			<label class="label" for="category">
				<span class="label-text">분류</span>
			</label>
			<select
				id="category"
				required
				name="category"
				class="select select-bordered w-full"
				bind:value={data.category}
			>
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
				name="amount"
			/>
		</div>
		<div class="form-control w-full">
			<label class="label" for="detail">
				<span class="label-text">설명</span>
			</label>
			<input
				id="detail"
				name="detail"
				type="text"
				placeholder="설명"
				bind:value={data.detail}
				class="input input-bordered input-lg"
			/>
		</div>
		<button class="btn btn-primary">저장하기</button>
	</form>
{/await}
