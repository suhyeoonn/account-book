<script lang="ts">
	import { AccountType } from '$lib/classes/AccountType';

	export let type: number;
</script>

<div class="join">
	<button
		type="button"
		class="btn join-item"
		class:btn-secondary={AccountType.isInputType(type)}
		on:click={() => (type = AccountType.INPUT)}
	>
		들어온 돈
	</button>
	<button
		type="button"
		class="btn join-item"
		class:btn-accent={AccountType.isOutputType(type)}
		on:click={() => (type = AccountType.OUTPUT)}
	>
		나간 돈
	</button>
</div>
