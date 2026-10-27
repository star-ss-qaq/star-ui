<template>
	<div class="star-ui su-calendar star-ui-calendar">
		<div
			class="star-ui-calendar--ctrl"
			:style="{ opacity: showSelYear || showSelMonth ? 0 : 1 }"
		>
			<div @click="selectingDate = selectingDate.add(-1, 'y')">&lt;&lt;</div>
			<div @click="selectingDate = selectingDate.add(-1, 'M')">&lt;</div>
			<div class="star-ui-calendar--display-month">
				<span @click="showSelYear = true">
					{{ selectingDate.format("YYYY") }}
				</span>
				-
				<span @click="showSelMonth = true">
					{{ selectingDate.format("MM") }}
				</span>
			</div>
			<div @click="selectingDate = selectingDate.add(1, 'M')">&gt;</div>
			<div @click="selectingDate = selectingDate.add(1, 'y')">&gt;&gt;</div>
		</div>
		<table
			cellspacing="0"
			cellpadding="0"
			:style="{ opacity: showSelYear || showSelMonth ? 0 : 1 }"
		>
			<tbody>
				<tr class="star-ui-calendar--inner-head">
					<th
						:class="`star-ui-calendar--${item.week}`"
						v-for="(item, index) in displayHead"
						:key="index"
					>
						{{ item.display }}
					</th>
				</tr>
				<tr v-for="(row, index) in displayData" :key="index">
					<td
						v-for="(day, index) in row"
						:key="index"
						:class="[
							'star-ui-calendar--inner-cell',
							`star-ui-calendar--${day.week}`,
							{
								'star-ui-calendar--previous': day.isPrevious,
								'star-ui-calendar--next': day.isNext,
							},
						]"
						@click="$emit('date-click', day.date)"
					>
						<slot v-if="$slots['default']" v-bind="day" />
						<!-- <component v-else-if="renderCell" :is="renderCell" v-bind="day" /> -->
						<template v-else>{{ day.display }}</template>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-if="showSelYear" class="star-ui-calendar--select">
			<div class="star-ui-calendar--select-ctrl">
				<div @click="selectingDate.add(-1, 'y')">&lt;&lt;</div>
				<div></div>
				<div @click="selectingDate.add(1, 'y')">&gt;&gt;</div>
			</div>
			<div class="star-ui-calendar--select-body">
				<div
					v-for="i in 12"
					:key="i"
					:class="{
						'now-sel':
							selectedYear + i - 6 + dShowSelYear * 12 === selectingYear,
					}"
					@click="
						showSelYear = false;
						dShowSelYear = 0;
						selectingDate = selectingDate.year(
							selectedYear + i - 6 + dShowSelYear * 12,
						);
					"
				>
					{{ selectedYear + i - 6 + dShowSelYear * 12 }}
				</div>
			</div>
		</div>
		<div v-if="showSelMonth" class="star-ui-calendar--select">
			<!-- <div class="star-ui-calendar--select-ctrl">
				<div @click="dShowSelYear--">&lt;&lt;</div>
				<div></div>
				<div @click="dShowSelYear++">&gt;&gt;</div>
			</div> -->
			<div class="star-ui-calendar--select-body">
				<div
					v-for="i in 12"
					:key="i"
					:class="{
						'now-sel': i - 1 === selectedMouth,
					}"
					@click="
						showSelMonth = false;
						selectingDate = selectingDate.month(i - 1);
					"
				>
					{{ i }}
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import dayjs, { Dayjs } from "dayjs";
import { computed, ref, shallowRef } from "vue";
const defaultWeekNames = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
] as const;
interface DateBaseInfo {
	display: number;
	isPrevious: boolean;
	isNext: boolean;
	week: string;
	date: dayjs.Dayjs;
}
</script>
<script setup lang="ts">
const {
	displayMonth,
	weekNames = defaultWeekNames,
	weekOffset = 0,
} = defineProps<{
	displayMonth?: Date | string | number | dayjs.Dayjs;
	/**
	 * 周的名字
	 */
	weekNames?: [string, string, string, string, string, string, string];
	/**
	 * 周的偏移量
	 */
	weekOffset?: number;
}>();
defineEmits<{ (ev: "date-click", date: dayjs.Dayjs): void }>();
const selectedDate = computed(() => {
	return dayjs(displayMonth);
});
const selectedYear = computed(() => selectedDate.value.year());
const selectedMouth = computed(() => selectedDate.value.month());
const selectingDate = shallowRef(dayjs(displayMonth));
const selectingYear = computed(() => selectingDate.value.year());
// const selectingMouth = computed(() => selectingDate.value.month());
const showSelYear = ref(false);
const showSelMonth = ref(false);
const displayHead = computed(() => {
	const mList = weekNames.map((item, index) => ({
		display: item,
		week: weekNames[index],
	}));
	return [...mList.slice(weekOffset), ...mList.slice(0, weekOffset)];
});
const displayData = computed(() => {
	let res: DateBaseInfo[][] = [[]];
	let now = res[0];

	let nowDay = dayjs(selectingDate.value);
	nowDay = nowDay.set("date", 1);
	let reqPreviousDays = nowDay.day() - weekOffset;
	if (reqPreviousDays < 0) reqPreviousDays += 7;
	nowDay = nowDay.add(-reqPreviousDays, "days");
	let isNotNext = true;
	while (isNotNext || now.length < 7) {
		if (now.length == 7) {
			now = [];
			res.push(now);
		}
		now.push({
			display: nowDay.date(),
			isPrevious: isNotNext && selectingDate.value.month() != nowDay.month(),
			isNext: !isNotNext,
			week: weekNames[nowDay.day()],
			date: dayjs(nowDay),
		});
		nowDay = nowDay.add(1, "days");
		isNotNext =
			selectingDate.value.year() >= nowDay.year() &&
			selectingDate.value.month() >= nowDay.month();
	}
	return res;
});
const dShowSelYear = ref(0);
</script>
<style>
.star-ui-calendar {
	text-align: center;
	display: inline-block;
	border: 1px solid #e8eaec;
}
.star-ui-calendar--ctrl {
	display: flex;
	flex-direction: row;
}
.star-ui-calendar--ctrl > * {
	padding: 5px;
	cursor: pointer;
}
.star-ui-calendar--display-month {
	flex: 1 0 auto;
	cursor: default;
}
.star-ui-calendar--display-month > span {
	cursor: pointer;
}
.star-ui-calendar th,
.star-ui-calendar td {
	padding: 5px 0;
}
.star-ui-calendar--inner-head {
	background-color: var(--star-ui-table-head-color);
}
.star-ui-calendar--inner-cell {
	border: 1px solid #e8eaec;
	width: 42px;
}
.star-ui-calendar--inner-cell.star-ui-calendar--Sat,
.star-ui-calendar--inner-cell.star-ui-calendar--Sun {
	color: #f00;
}
.star-ui-calendar--inner-cell.star-ui-calendar--previous,
.star-ui-calendar--inner-cell.star-ui-calendar--next {
	opacity: 0.5;
}

.star-ui-calendar--select {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: inherit;
}
.star-ui-calendar--select-body {
	flex-grow: 1;
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	grid-template-columns: repeat(4, 1fr);
	align-items: center;
}
.star-ui-calendar--select-body > * {
	cursor: pointer;
}
.star-ui-calendar--select-body > *:hover {
	color: var(--star-ui-base-color);
}
.star-ui-calendar--select-ctrl {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 20%;
	align-items: center;
}
.star-ui-calendar--select-ctrl > * {
	padding: 0 15px;
	cursor: pointer;
}
.star-ui-calendar .now-sel {
	color: var(--star-ui-primary-color);
	font-weight: bold;
}
</style>
