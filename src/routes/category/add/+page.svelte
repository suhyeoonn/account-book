<script>
	import { AccountType } from '$lib/classes/AccountType';
	import AccountTypeButtons from '$lib/components/\bAccountTypeButtons.svelte';
	import { CategoryModel } from '$lib/models/CategoryModel';

	let type = AccountType.OUTPUT;
	let name = '';

	const onSubmit = async () => {
		try {
			await new CategoryModel().save({ name, type });
			location.href = '/category';
		} catch (e) {
			console.error(e);
		}
	};
</script>

<form class="flex flex-col gap-10" on:submit={onSubmit}>
	<AccountTypeButtons bind:type />

	<div class="form-control w-full">
		<label class="label" for="date">
			<span class="label-text">카테고리명</span>
		</label>
		<input type="name" bind:value={name} required class="input input-bordered input-lg" />
	</div>
	<button class="btn btn-primary">저장하기</button>
</form>
