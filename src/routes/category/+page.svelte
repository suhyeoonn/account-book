<script lang="ts">
	import { AccountType } from '$lib/classes/AccountType';

	export let data;
</script>

<!-- TODO 카테고리 삭제 기능 추가 -->
<h1 class="text-2xl mb-5">Category List</h1>
<ul class="mb-5">
	{#each data.categoryList as category}
		<li class="p-1">
			{category.name}
			<span
				class="text-white p-1 rounded-md"
				class:bg-secondary={AccountType.isInputType(category.type)}
				class:bg-accent={AccountType.isOutputType(category.type)}
				>{AccountType.isInputType(category.type) ? '수입' : '지출'}</span
			>
		</li>
	{/each}
</ul>
<button class="btn btn-primary" on:click={() => (location.href = '/category/add')}>ADD</button>
