<template>
	<div class="learning-record-wrap">
		<bui-header title="学习记录">
		</bui-header>
		<bui-content-scroll>
			<div class="learning-record-row">
				<bui-image class="learning-record-head-img" src="/image/icon_kefu.png" radius="57px"></bui-image>
				<div class="learning-record-col">
					<text class="record-font-36 learning-record-author">黄丽</text>
					<text class="record-font-20 learning-record-detail">技术管理部</text>
					<text class="record-font-20 learning-record-detail">需求分析师</text>
				</div>
				<div class="learning-record-time-block">
					<text class="record-font-36 learning-record-time">{{second2Time(profile.learnDuration)}}</text>
					<text class="learning-record-tim">学习时长</text>
				</div>
			</div>
			<div class="learning-record-center">
				<div class="learning-record-count">
					<text class="record-font-32 record-color-6">{{profile.courseDoneNum}}门</text>
					<text class="record-font-20 record-color-9">已学微课</text>
				</div>
				<div class="record-border"></div>
				<div class="learning-record-count">
					<text class="record-font-32 record-color-6">{{profile.signupCount}}次</text>
					<text class="record-font-20 record-color-9">参加培训</text>
				</div>
				<div class="record-border"></div>
				<div class="learning-record-count">
					<text class="record-font-32 record-color-6">{{profile.liveDoneNum}}个</text>
					<text class="record-font-20 record-color-9">观看直播</text>
				</div>
			</div>
			<div class="learning-record-bar">
					<text class="record-font-28 record-text">学习记录</text>
			</div>
			<div v-if="records.length > 0">
				<div class="course-list">
					<div class="course-list-item bb1" v-for="record in records">
						<bui-image class="course-item-img" :src="getPicture(record.picture)"></bui-image>
						<div class="course-content">
							<text class="course-item-title">{{record.name}}</text>
							<text class="course-item-time">{{record.time}}</text>
						</div>
					</div>
				</div>
				<div @click="getMoreRecords" class="more-record">
					<text class="record-font-28 record-color-6 more-record-text">更多记录</text>
				</div>
			</div>
			<div v-else class="no-record">
				<bui-image class="no-record-img" src="/image/no-record.png"></bui-image>
				<text class="no-record-text">亲，你还没有学习记录哦！</text>
			</div>
		</bui-content-scroll>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from "../../js/ajax.js";
import {fixedPic, departUrl, secondToTime} from "../../js/tool.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				leftItem: {
					icons: 'icon-back',
				},
				profile: {
					head_img: '',
					signupCount: 0,
					courseDoneNum: 0,
					liveDoneNum: 0,
					learnDuration: 0
				},
				records: [],
				courses: [],
				trains: [],
				lives: []
			}
		},
		mounted(){
			this.getRecords();
			this.getProfile();
		},
		methods:{
			back(){
				buiweex.pop();
			},
			getRecords () {
				ajax({
					url : 'api/homepage/historyInfos',
					data : {
						page : 1,
						rows : 4
					}
				}).then((res) =>{
					this.records = res.r;
				},(errorT,status) =>{
					
				})
			},
			getProfile () {
				ajax({
					url : 'api/ta/info',
					data : {
						userid : '43fe6476-cd7b-493b-8044-c7e3149d0876'
					}
				}).then((res) =>{
					this.profile.signupCount = res.r[0].signupCount;
					this.profile.courseDoneNum = res.r[0].courseDoneNum;
					this.profile.liveDoneNum = res.r[0].liveDoneNum;
					this.profile.learnDuration = res.r[0].learnDuration;
				},(errorT,status) =>{

				})
			},
			getMoreRecords () {
				buiweex.push(buiweex.getContextPath() + "/more-record.weex.js");
			},
			getPicture (src) {
				return fixedPic(src);
			},
			getRecordType (rec) {
				let obj = departUrl(rec.url);
				return obj.args[0].value;
			},
			second2Time (second){
				return secondToTime(second);
			}
		},
		created (){
			globalEvent.addEventListener("androidback", function (e){
						buiweex.pop();
			});
		},
	}
</script>

<style src="../../css/customer/course-list.css" />

<style scope>
.record-font-36{
	font-size: 36px;
	text-align: center;
}

.record-font-28{
	font-size: 28px;
	text-align: center;
}

.record-font-32{
	font-size: 32px;
	text-align: center;
}

.record-font-22{
	font-size: 22px;
	text-align: center;
}

.record-font-20{
	font-size: 20px;
	text-align: center;
}

.record-color-6{
	color: #666666;
}

.record-color-9{
	color: #999999;
}

.learning-record-row{
	flex-direction: row;
	background-color: #4ca4fe;
	padding-left : 28px; 
	padding-bottom: 32px;
	padding-top: 20px;
}

.learning-record-head-img{
	height: 114px;
	width: 114px;
}

.learning-record-col{
	margin-left: 40px;
}

.learning-record-author{
	color: white;
	margin-bottom: 10px;
}

.learning-record-detail{
	text-align: center;
	color: white;
	margin-top: 5px;
}

.learning-record-time-block{
	position: absolute;
	right: 48px;
	align-items: flex-end;
}

.learning-record-time{
	color: white;
}

.learning-record-tim{
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 20px;
	font-size: 20px;
	color: white;
	border-width: 1px;
	border-style: solid;
	border-color: white;
	border-radius: 30px;
	margin-top: 10px;
	width: 120px;
}

.learning-record-center{
	flex-direction: row;
	background-color: white;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
}

.learning-record-count{
	flex: 1;
	padding: 20px;
}

.record-border{
	width: 2px;
	height: 59px;
	background-color: #DEDEDE;
}

.learning-record-bar{
	border-left-color: #25AAFE;
	border-left-style: solid;
	border-left-width: 8px;
	background-color: #F6F6F6;
	height: 80px;
	flex-direction: row;
	align-items: center;
}

.record-text{
	text-align: left;
	margin-left: 20px;
	color: #4A4A4A;
}

.record-block{
	flex-direction: row;
	height: 214px;
}

.record-img{
	position: absolute;
	top: 25px;
	left: 24px;
	width: 295px;
	height: 164px;
}

.record-name{
	position: absolute;
	top: 30px;
	left: 347px;
}

.record-time{
	position: absolute;
	top: 159px;
	left: 347px;
}

.record-spilt{
	margin-left: 24px;
	margin-right: 24px;
	height: 1px;
	background-color: #DEDEDE;
}

.more-record{
	height: 98px;
	flex-direction: row;
	align-items: center;
}

.more-record-text{
	flex: 1;
}

.no-record{
	flex-direction: row;
	height: 400px;
}

.no-record-img{
	width: 83px;
	height: 102px;
	position: absolute;
	top: 48px;
	left: 93px;
}

.no-record-text{
	font-size: 30px;
	color: #9B9B9B;
	position: absolute;
	top: 89px;
	left: 245px;
}
</style>
