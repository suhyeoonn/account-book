<script lang="ts">
	export let date: Date;
</script>

<h3 class="border-b pb-2 grid grid-cols-4 items-center">
	<div class="col-span-2">
		<span class="font-bold text-lg">{date.getDate()}</span>
		<span>금요일 {date.getDay()}</span>
		<span class="text-gray-500 text-sm">{date.getFullYear()}.{date.getMonth() + 1}</span>
	</div>
	<span class="text-secondary text-center">0원</span>
	<span class="text-error text-center">100,000원</span>
</h3>
