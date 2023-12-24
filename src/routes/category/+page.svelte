<script>
	import { cateogryList } from '$lib/category';
</script>

<h1>category</h1>

<!-- TODO category type class 추가 -->
<ul>
	{#each cateogryList as category}
		<li>{category.name} {category.type}</li>
	{/each}
</ul>
<button class="btn btn-primary" on:click={() => (location.href = '/category/add')}>ADD</button>
