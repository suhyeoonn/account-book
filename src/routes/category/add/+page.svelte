<script>
	import { AccountType } from '$lib/classes/AccountType';
	import AccountTypeButtons from '$lib/components/\bAccountTypeButtons.svelte';

	let type = AccountType.OUTPUT;
	let name = '';
</script>

<form class="flex flex-col gap-10" method="post">
	<AccountTypeButtons bind:type />
	<input type="hidden" name="type" value={type} />
	<div class="form-control w-full">
		<label class="label" for="date">
			<span class="label-text">카테고리명</span>
		</label>
		<input
			type="text"
			name="name"
			bind:value={name}
			required
			class="input input-bordered input-lg"
		/>
	</div>
	<button class="btn btn-primary">저장하기</button>
</form>
