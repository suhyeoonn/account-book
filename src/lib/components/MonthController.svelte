<script lang="ts">
	import { month, updateMonth, year } from '../../stores/accountHistory';

	let gapMonth = 0;
</script>

<div>
	<button on:click={() => updateMonth(--gapMonth)}>이전</button>
	<span>{$year}년 {$month}월</span>
	<button on:click={() => updateMonth(++gapMonth)}>다음</button>
</div>
