<template>
	<div class="star-ui su-calendar star-ui-calendar">
		<div class="star-ui-calendar--ctrl" :style="{opacity: showSelYear||showSelMonth?0:1}">
			<div @click="dYear--">&lt;&lt;</div>
			<div @click="dMonth--">&lt;</div>
			<div class="star-ui-calendar--display-month">
				<span @click="showSelYear=true">{{displayMonthDate.format("YYYY")}}</span>
				-
				<span @click="showSelMonth=true">{{displayMonthDate.format("MM")}}</span>
			</div>
			<div @click="dMonth++">&gt;</div>
			<div @click="dYear++">&gt;&gt;</div>
		</div>
		<table cellspacing="0" cellpadding="0" :style="{opacity: showSelYear||showSelMonth?0:1}">
			<tr class="star-ui-calendar--inner-head">
				<th :class="`star-ui-calendar--${item.week}`" v-for="(item,index) in displayHead" :key="index">{{item.display}}</th>
			</tr>
			<tr v-for="(row,index) in displayData" :key="index">
				<td v-for="(day,index) in row" :key="index" :class="['star-ui-calendar--inner-cell',`star-ui-calendar--${day.week}`,{'star-ui-calendar--previous':day.isPrevious,'star-ui-calendar--next':day.isNext}]" @clcik="dateClick(day)">
					
					<slot v-if="$slots['default']" v-bind="day" />
					<vnodes v-else-if="renderCell" :func="renderCell" :args="[day]" />
					<template v-else>{{day.display}}</template>
				</td>
			</tr>
		</table>
		<div v-if="showSelYear" class="star-ui-calendar--select">
			<div class="star-ui-calendar--select-ctrl">
				<div @click="dShowSelYear--">&lt;&lt;</div>
				<div></div>
				<div @click="dShowSelYear++">&gt;&gt;</div>
			</div>
			<div class="star-ui-calendar--select-body">
				<div v-for="i in 12" :key="i" :class="{'now-sel':i==6&&dShowSelYear==0}" @click="dYear+=i-6+dShowSelYear*12;showSelYear=false;dShowSelYear=0;">
					{{displayMonthDate.year()+i-6+dShowSelYear*12}}
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
				<div v-for="i in 12" :key="i" :class="{'now-sel':i==6&&dShowSelYear==0}" @click="showSelMonth=false;dShowSelYear=0;">
					{{i}}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Register, Prop, Emit } from "@ui-root/reg";
import moment from "moment";
import CallRender from "./call-render";


import "../global-style.css";

const weekNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
interface DateBaseInfo{
	display:number;
	isPrevious:boolean;
	isNext:boolean;
	week:string;
	date:moment.Moment;
}

@Register({
	name:"su-calendar",
	components:{
		vnodes: CallRender,
	}
})
export default class SuCalendar extends Vue {
	@Prop({
		type:[Date,String],
		default:()=>{
			return new Date();
		}
	})
	public readonly displayMonth!:Date|string;
	private dYear=0;
	private dMonth=0;
	private get displayMonthDate():moment.Moment{
		let date=moment(this.displayMonth);
		date.date(1);
		date.add(this.dYear,"y").add(this.dMonth,"M");
		return date;
	}
	@Prop({
		type:Array,
		default:()=>{
			return weekNames;
		}
	})
	public readonly weekName!:string[];

	@Prop({
		type:Number,
		default:0,
		validator: (input:number): boolean=>{
			return input>=0&&input<7
		}
	})
	public weekOffect!:number;

	private get displayHead():{
		display:string;
		week:string;
	}[]{
		const mList=this.weekName.map((item,index)=>({
			display: item,
			week:weekNames[index],
		}))
		return [
			...mList.slice(this.weekOffect),
			...mList.slice(0,this.weekOffect),
		];
	}
	private get displayData():DateBaseInfo[][]{
		let res:DateBaseInfo[][]=[[]];
		let now=res[0];
		
		const nowDay = moment(this.displayMonthDate);
		nowDay.set('date',1);
		let reqPreviousDays=nowDay.day()-this.weekOffect;
		if(reqPreviousDays<0) reqPreviousDays+=7;
		nowDay.add(-reqPreviousDays,'days');
		let isNotNext=true;
		while(isNotNext||now.length<7){
			if(now.length==7){
				now=[];
				res.push(now);
			}
			now.push({
				display:nowDay.date(),
				isPrevious:isNotNext&&this.displayMonthDate.month()!=nowDay.month(),
				isNext:!isNotNext,
				week:weekNames[nowDay.day()],
				date:moment(nowDay),
			});
			nowDay.add(1,'days');
			isNotNext=this.displayMonthDate.year()>=nowDay.year()&&this.displayMonthDate.month()>=nowDay.month();
		}
		return res;
	}
	@Prop({
		type:Function,
		default:undefined
	})
	public readonly renderCell!:(arg:DateBaseInfo)=>unknown;

	private showSelYear=false;
	private dShowSelYear=0;
	private showSelMonth=false;

	@Emit()
	private dateClick(data:DateBaseInfo):DateBaseInfo{
		return data;
	}
}
</script>

<style>
.star-ui-calendar{
	text-align: center;
	display: inline-block;
	border: 1px solid #e8eaec;
}
.star-ui-calendar--ctrl{
	display: flex;
	flex-direction: row;
}
.star-ui-calendar--ctrl>*{
	padding: 5px;
	cursor: pointer;
}
.star-ui-calendar--display-month{
	flex: 1 0 auto;
	cursor: default;
}
.star-ui-calendar--display-month>span{
	cursor: pointer;
}
.star-ui-calendar th,.star-ui-calendar td{
	padding: 5px 0;
}
.star-ui-calendar--inner-head{
	background-color: var(--star-ui-table-head-color);
}
.star-ui-calendar--inner-cell{
	border: 1px solid #e8eaec;
	width: 42px
}
.star-ui-calendar--inner-cell.star-ui-calendar--Sat,.star-ui-calendar--inner-cell.star-ui-calendar--Sun{
	color: #f00;
}
.star-ui-calendar--inner-cell.star-ui-calendar--previous,.star-ui-calendar--inner-cell.star-ui-calendar--next{
	opacity: 0.5;
}

.star-ui-calendar--select{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: inherit;
}
.star-ui-calendar--select-body{
	flex-grow: 1;
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	grid-template-columns: repeat(4, 1fr);
	align-items: center;
}
.star-ui-calendar--select-body>*{
	cursor: pointer;
}
.star-ui-calendar--select-body>*:hover{
	color: var(--star-ui-base-color);
}
.star-ui-calendar--select-ctrl{
	display: flex;
	flex-direction: row;
	justify-content:space-between;
	height: 20%;
	align-items: center;
}
.star-ui-calendar--select-ctrl>*{
	padding: 0 15px;
	cursor: pointer;
}
.star-ui-calendar .now-sel{
	color: var(--star-ui-base-color);
	font-weight: bold;
}
</style>
