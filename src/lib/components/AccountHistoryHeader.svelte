<script lang="ts">
	export let date: Date;
	export let inputTotal: string;
	export let outputTotal: string;

	const week = ['일', '월', '화', '수', '목', '금', '토'];
</script>

<h3 class="border-b pb-2 grid grid-cols-4 items-center">
	<div class="col-span-2">
		<span class="font-bold text-lg">{date.getDate()}</span>
		<span>{week[date.getDay()]}요일</span>
		<span class="text-gray-500 text-sm">{date.getFullYear()}.{date.getMonth() + 1}</span>
	</div>
	<span class="text-secondary text-center">{inputTotal}원</span>
	<span class="text-error text-center">{outputTotal}원</span>
</h3>
