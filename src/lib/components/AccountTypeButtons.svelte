<script lang="ts">
	import { accountType } from '$lib/types';

	export let type: accountType;
</script>

<div class="join">
	<button
		type="button"
		class="btn join-item"
		class:btn-secondary={type === accountType.INPUT}
		on:click={() => (type = accountType.INPUT)}
	>
		들어온 돈
	</button>
	<button
		type="button"
		class="btn join-item"
		class:btn-accent={type === accountType.OUTPUT}
		on:click={() => (type = accountType.OUTPUT)}
	>
		나간 돈
	</button>
</div>
