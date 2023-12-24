<script lang="ts">
	import { CategoryModel } from '$lib/models/CategoryModel';

	// TODO server.js에서 가져오도록 변경 https://learn.svelte.dev/tutorial/page-data
	const cateogryModel = new CategoryModel();
	const promise = cateogryModel.fetchCategory();
</script>

<h1>category</h1>

<!-- TODO category type class 추가 -->
{#await promise}
	<!-- TODO loading component -->
	loading...
{:then cateogryList}
	<ul>
		{#each cateogryList as category}
			<li>{category.name} {category.type}</li>
		{/each}
	</ul>
	<button class="btn btn-primary" on:click={() => (location.href = '/category/add')}>ADD</button>
{/await}
