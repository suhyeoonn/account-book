<script lang="ts">
	import { AccountType } from '$lib/classes/AccountType';
	import type { cateogryType } from '$lib/types';

	export let data: { categoryList: cateogryType[] };
</script>

<h1 class="text-2xl mb-5">Category List</h1>
<ul class="mb-5">
	{#each data.categoryList as category}
		<li class="p-1">
			{category.name}
			<span
				class="text-white p-1 rounded-md"
				class:bg-secondary={category.type === AccountType.INPUT}
				class:bg-accent={category.type === AccountType.OUTPUT}
				>{category.type === AccountType.INPUT ? '수입' : '지출'}</span
			>
		</li>
	{/each}
</ul>
<button class="btn btn-primary" on:click={() => (location.href = '/category/add')}>ADD</button>
