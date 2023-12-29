<script lang="ts">
	import { AccountType } from '$lib/classes/AccountType';

	export let accountType: AccountType;
</script>

<div class="join">
	<button
		type="button"
		class="btn join-item"
		class:btn-secondary={accountType.isInputType()}
		on:click={() => (accountType.type = AccountType.INPUT)}
	>
		들어온 돈
	</button>
	<button
		type="button"
		class="btn join-item"
		class:btn-accent={accountType.isOutputType()}
		on:click={() => (accountType.type = AccountType.OUTPUT)}
	>
		나간 돈
	</button>
</div>
