<script lang="ts">
	const history = [
		{
			date: '2022-11-09',
			detail: '내용',
			amount: 10000
		},
		{
			date: '2022-11-09',
			detail: '내용',
			amount: 10000
		},
		{
			date: '2022-11-09',
			detail: '내용',
			amount: 10000
		}
	];
</script>

<h1>거래 내역 페이지</h1>
<ul>
	{#each history as { date, detail, amount }}
		<li class="grid grid-cols-3 text-gray-500 p-2">
			<span>{date}</span>
			<span class="text-gray-800">{detail}</span>
			<span>{amount}원</span>
		</li>
	{/each}
</ul>
