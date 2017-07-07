<template>
	<div class="learning-record-wrap">
		<bg src="/image/record-header.png" 
			:contentStyle="contentStyle"
			:bgStyle="bgStyle"
			>
			<bui-header title="学习记录"
				:leftItem="leftItem"
				@leftClick = "back"
				backgroundColor="transparent"				
				>
			</bui-header>
			<div class="learning-record-row" ref="profile">
				<div class="header-wrap">
					<bui-image class="header-img" width="114px" height="114px"
					 :src="avatar" placeholder="/dist/image/icon_kefu.png" radius="57px"></bui-image>
				</div>
				<div class="learning-record-col">
					<text class="record-font-36 learning-record-author">{{profile.name}}</text>
					<text class="record-font-20 learning-record-detail">{{profile.orgName}}</text>
					<text class="record-font-20 learning-record-detail">{{profile.postDescription}}</text>
				</div>
				<div class="learning-record-time-block">
					<text class="record-font-36 learning-record-time">{{second2Time(recordStat.learnDuration)}}</text>
					<text class="learning-record-tim">学习时长</text>
				</div>
			</div>
			<scroller class="span1" @scroll="onScroll">
				<div class="white-background">
					<div class="learning-record-center">
						<div class="learning-record-count">
							<text class="record-font-32 record-color-6">{{recordStat.courseDoneNum}}门</text>
							<text class="record-font-20 record-color-9">已学微课</text>
						</div>
						<div class="record-border"></div>
						<div class="learning-record-count">
							<text class="record-font-32 record-color-6">{{recordStat.signupCount}}次</text>
							<text class="record-font-20 record-color-9">参加培训</text>
						</div>
						<div class="record-border"></div>
						<div class="learning-record-count">
							<text class="record-font-32 record-color-6">{{recordStat.liveDoneNum}}个</text>
							<text class="record-font-20 record-color-9">观看直播</text>
						</div>
					</div>
					<div class="learning-record-bar">
							<text class="record-font-28 record-text">学习记录</text>
					</div>
					<div v-if="records.length > 0">
						<div :key="record" class="course-list" v-for="record in records">
							<div class="course-list-item bb1" @click="linkDetail(record)">
								<div class="avatar-wrap">
									<bui-image class="default-pic" src="/image/no-pic.png"></bui-image>
									<bui-image class="course-item-img" :src="getPicture(record.picture)"></bui-image>
								</div>
								<div class="course-content">
									<text class="course-item-title">{{record.name}}</text>
									<text class="course-item-time">{{getRecordExt(record)}}</text>
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
				</div>
			</scroller>
		</bg>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from "../../js/ajax.js";
import linkapi from '../../js/linkapi.js';
import {fixedPic, departUrl, secondToTime, formatDate} from "../../js/tool.js";
var globalEvent = weex.requireModule('globalEvent');
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation');
	export default {
		data () {
			return {
				leftItem: {
					icons: 'icon-back',
				},
				recordStat: {
					signupCount: 0,
					courseDoneNum: 0,
					liveDoneNum: 0,
					learnDuration: 0
				},
				profile: {
					avatar: '',
					name: '',
					orgName: '',
					postDescription: ''
				},
				avatar: '',
				records: [],
				courses: [],
				trains: [],
				lives: [],
				placeholder: '/image/no-pic.png',
				showProfile: true,
			}
		},
		mounted(){
			this.getRecords();
			try{
				this.getProfileInLink();
			}
			catch(e){
				this.getRecordStat();
				this.getProfile();
			}
		},
		computed: {
			bgStyle () {
				return {
					height : '280px',
				}
			},
			contentStyle () {
				return {
					flex : 1
				}
			}
		},
		methods:{
			back(){
				buiweex.pop();
			},
			getRecords () {
				ajax({
					url : 'ba/api/homepage/historyInfos',
					data : {
						page : 1,
						rows : 4
					}
				}).then((res) =>{
					this.records = res.r;
				},(errorT,status) =>{
					
				})
			},
			getRecordStat (uid='43fe6476-cd7b-493b-8044-c7e3149d0876') {
				ajax({
					url : 'ba/api/ta/info',
					data : {
						userid : uid
					}
				}).then((res) =>{
					this.recordStat = res.r[0];
				},(errorT,status) =>{

				})
			},
			getProfileInLink() {
				linkapi.getLoginInfo(
						res=>{	
							let uid = res.userId;
							this.avatar = res.picture;
							this.getProfile(uid);
							this.getRecordStat(uid)
						},
						()=>{}
				)
			},
			getProfile (uid='43fe6476-cd7b-493b-8044-c7e3149d0876') {
				ajax({
					url : 'uam/api/user/getUserById',
					data : {
						id : uid
					}
				}).then((res) =>{
					this.profile = res.r
					this.profile.avatar = this.getPicture(this.profile.avatar,'uam');
				},(errorT,status) =>{

				})
			},
			getMoreRecords () {
				buiweex.push(buiweex.getContextPath() + "/more-record.weex.js");
			},
			getPicture (src) {
				let field = arguments[1];
				return fixedPic(src, field) || this.placeholder;
			},
			second2Time (second){
				return secondToTime(second);
			},
			getRecordType (rec) {
				let obj = departUrl(rec.url);
				return obj.args[0].value;
			},
			getRecordExt (rec) {
				let type = this.getRecordType(rec);
				if(type === 'Live') return formatDate(rec.ext.startTime, '开始于 MM-dd hh:mm');
				if(type === 'Course') {
					if(rec.ext.duration === undefined) return '';
					if(rec.ext.duration === '-1') return '已学完';
					return '学习到' + secondToTime(rec.ext.duration);
				}
				return formatDate(rec.ext.regTime, '开始于 MM-dd hh:mm');      
			},
			onScroll(e){
				let o = 0;
				if(e.contentOffset.y<-10) {
					o = 0;
				}
				else{
					o = 1;
				}
				let profile = this.$refs.profile;
				let option = {
					styles : {opacity : o}
				} 
				animation.transition(profile,option);
			},
			linkDetail (rec) {
				let type = this.getRecordType(rec);
				if(type === 'Live') buiweex.push(buiweex.getContextPath() + "/live.weex.js",{
          liveId : rec.itemId
        });
				else if(type === 'Course') buiweex.push(buiweex.getContextPath() + "/micro-class-detail.weex.js",{
            		courseId : rec.itemId
            	});
				else buiweex.push(buiweex.getContextPath() + "/train.weex.js");
			}
		},
		created (){
			globalEvent.addEventListener("androidback", function (e){
						buiweex.pop();
			});
		}
	}
</script>

<style src="../../css/customer/course-list.css"></style>

<style scope>
.span1{
	flex : 1;
}

.record-header{
	width: 1000px;
	height: 300px;
}

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
	position: absolute;
	top: 117px;
	width: 750px;
	flex-direction: row;
	background-color: transparent;
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
	text-align: left;
	color: white;
	margin-bottom: 10px;
	width: 150px;
	lines: 1;
	text-overflow: ellipsis;
}

.learning-record-detail{
	text-align: left;
	color: white;
	margin-top: 5px;
	width: 150px;
	lines: 1;
	text-overflow: ellipsis;
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

.white-background{
	margin-top: 170px;
	background-color: white;	
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
