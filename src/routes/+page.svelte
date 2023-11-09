<script lang="ts">
	const history = [
		{
			date: '2022-11-09',
			description: '내용',
			amount: 10000
		},
		{
			date: '2022-11-09',
			description: '내용',
			amount: 10000
		},
		{
			date: '2022-11-09',
			description: '내용',
			amount: 10000
		}
	];
</script>

<h1>거래 내역 페이지</h1>
<ul>
	{#each history as { date, description, amount }}
		<li>
			<span>{date}</span>
			<span>{description}</span>
			<span>{amount}원</span>
		</li>
	{/each}
</ul>
