<script lang="ts">
	import moment from 'moment';

	let gapMonth = 0;
	let gapYear = 0;

	// TODO store 사용하여 월 변경되면 부모에 반영
	$: date = moment().add({ year: gapYear, months: gapMonth });
</script>

<div>
	<button on:click={() => (gapMonth -= 1)}>이전</button>
	<span>{date.year()}년 {date.month() + 1}월</span>
	<button on:click={() => (gapMonth += 1)}>다음</button>
</div>
