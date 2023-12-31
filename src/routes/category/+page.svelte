<script lang="ts">
	import type { Category } from '$lib/classes/Category';

	export let data: { categoryList: Category[] };
</script>

<h1 class="text-2xl mb-5">Category List</h1>
<ul class="mb-5">
	{#each data.categoryList as category}
		<li class="p-1">
			{category.name}
			<span
				class="text-white p-1 rounded-md"
				class:bg-secondary={category.type.isInputType()}
				class:bg-accent={category.type.isOutputType()}>{category.type.typeName}</span
			>
		</li>
	{/each}
</ul>
<button class="btn btn-primary" on:click={() => (location.href = '/category/add')}>ADD</button>
