<template>
	<div class="live-wrap">
		<bui-content v-if="!loading && !returnMsg" class="span1">
			<div class="video-wrap" style="height:0px">
				<bui-video class="test-video"
					v-if="testVideo"
					:src="testVideo"
					:playstatus="status"
					:autoplay= "autoplay"
					@start="onstart($event)"
					@pause="onpause($event)"
					@finish="onfinish($event)"
					@fail="onfail($event)">
				</bui-video>
			</div>
			<div class="video-wrap" style="height:423px;">
				<bui-video class="bui-video"
					v-if="videoSrc"
					:src="videoSrc"
					:playstatus="status"
					:autoplay= "autoplay"
					@start="onstart($event)"
					@pause="onpause($event)"
					@finish="onfinish($event)"
					@fail="onfail($event)">
				</bui-video>
				<bg v-if="bgSrc" :src="bgSrc" :bgStyle="bgStyle">
					<div class="overlay"></div>
					<div v-if="errorShow" class="msg-block">
						<text class="notStart-text">网络出现异常</text>
					</div>
					<div v-if="flvErr" class="msg-block">
						<text class="notStart-text">ios 暂不支持 flv 格式视频播放</text>
					</div>
					<div v-if="liveDetail.liveStatus===0" class="msg-block">
						<text class="notStart-text">直播未开始</text>
						<text class="notStart-text">{{getDate(liveDetail.startTime)}}</text>
					</div>
					<div v-if="liveDetail.liveStatus===1" class="msg-block">
						<text class="notStart-text">老师离开</text>
						<text class="notStart-text">敬请期待</text>						
					</div>
					<div v-if="liveDetail.liveStatus===2 && replays.length===0" class="msg-block">
						<text class="notStart-text">直播已结束</text>				
					</div>
					<div v-if="liveDetail.liveStatus===2 && replays.length>0 && !flvErr" class="msg-block">
						<bui-image class="play-btn" src="/image/play.png" @click="playReplay(1,replays[0].url)"></bui-image>			
					</div>
				</bg>
				<bui-image width='66px' height='66px' v-if="isShow" @click="back" class="icon-back" src="/image/icon-back.png"></bui-image>
				<bui-image width='66px' height='66px' v-if="isShow" @click="share($event)" class="icon-friendship" src="/image/icon-friendship.png"></bui-image>           
			</div>
			<scroller>
				<div class="summary-block">
					<text class="summary">{{liveDetail.name}}</text>
					<text v-if="liveDetail.liveStatus===0" class="book-count">{{liveDetail.appointmentCount||0}}人预约</text>
					<text v-if="liveDetail.liveStatus===1" class="book-count">{{liveDetail.liveCount||0}}人在线</text>
					<text v-if="liveDetail.liveStatus===2" class="book-count">{{liveDetail.learnCount||0}}人已学</text>
				</div>
				<div>
					<list class="bobr-bottom">
						<cell class="live-item bobr">
							<text class="title">主讲人</text>
							<text class="name">{{liveDetail.teacherName}}</text>
							<bui-icon class="icon-go" name="icon-go"></bui-icon>
						</cell>
						<cell class="live-item">
							<text class="title">组织者</text>
							<text class="name">{{liveDetail.organizerName}}</text>
							<bui-icon class="icon-go" name="icon-go"></bui-icon>
						</cell>
					</list>
				</div> 
				<div v-if="replays.length>0 && liveDetail.liveStatus===2" class="bobr-bottom">
					<text class="rep-title bobr">精彩回放</text>
					<div class="rep-block">
						<scroller scroll-direction="horizontal" class="rep-list">
							<div :key="(item,index)" v-for="(item,index) in replays">
								<div @click="playReplay(index+1,item.url)"
								class="rep-circle"
								:class="[index+1===replayindex?'rep-circle-act':'']">
									<text class="rep-index" :class="[index+1===replayindex?'rep-index-act':'']">{{index+1}}</text>
								</div>
							</div>
						</scroller>
					</div>
				</div>
				<div>
					<text class="intro bobr">直播简介</text>
					<div class="introduce">
						<text class="into-text">{{liveDetail.outline}}</text>
					</div>
				</div>
			</scroller>
		</bui-content>
		<dropdown
				:showArrow="true"
				:show="isShowDropdown"
				@close="closeDropdown"
				ref="dropdowns">
				<div class="bui-list">
						<div class="bui-cell" :key="item" v-for="item in shareList" @click="action(item)">
								<div class="bui-list-left">
										<icon :name="item['icon']"></icon>
								</div>
								<div class="bui-list-main">
										<text class="bui-list-title">{{item.title}}</text>
								</div>
						</div>
				</div>
		</dropdown>
		<progress ref="progress"></progress>
		<div style="flex:1;width:750px;" v-if="returnMsg">
			<bui-header title=""
				:leftItem="leftItem"
				@leftClick = "back"			
				>
			</bui-header>
			<prompt src="/image/null.png" :text="returnMsg"></prompt>
		</div>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from '../../js/ajax.js';
import dropdown from '../../components/bui-dropdown.vue';
import buiVideo from '../../components/bui-video.vue';
import linkapi from '../../js/linkapi.js';
import prompt from '../components/prompt.vue';
import {fixedPic,formatDate,coder, extend} from "../../js/tool.js";
var globalEvent = weex.requireModule('globalEvent');
var websocket = weex.requireModule('webSocket')

	export default {
		data () {
			return {
				leftItem: {
					icons: 'icon-back',
				},
				loading: true,
				returnMsg: null,
				isShow: true,
				errorShow: false,
				flvErr: false,
				videoSrc: null,
				testVideo: null,
				bgSrc: null,
				replayindex: 0,
				status: 'play',
				liveFail: true,
				liveDetail: {},
				replays: [],
				firstin: true,
				autoplay: 'true',
				isShowDropdown : false,
				shareList: [
					{icon: 'icon-share', title: '分享给同事'},
					{icon: 'icon-share', title: '分享到社区'}
				]
			}
		},
		mounted(){
			this.refresh();
			// this.connect();
		},
		methods:{
			back(){
				buiweex.pop();
			},
			
			refresh () {
				Promise.all([this.getLiveDetail(),this.getReplays()])
					.then(()=>{
						this.loading = false;
						extend(this.$refs.progress, {id:'progress', width:750, duration:1000, opacity:'0'});
					},()=>{
						this.loading = false;
						extend(this.$refs.progress, {id:'progress', width:750, duration:1000, opacity:'0'});
					})
				setInterval(()=>{
					Promise.all([this.getLiveDetail(),this.getReplays()])
						.then(()=>{
							
						})
				},26000)
			},
			action (item) {
				item = item.title;
				if (item === '分享给同事') {
					linkapi.shareToMessage({
						title : '视频',
						content : 'content',
						url : 'http://www.baidu.com',
						type : 'WEBSITE',
					});
				}else if(item === '分享到社区'){
					linkapi.shareToBlog({
						title : '视频',
						content : 'content',
						url : 'http://www.baidu.com',
						type : 'WEBSITE',
					});
				}
				this.closeDropdown();
			},
			"onstart": function () {
					this.isShow = false;
			},
			"onpause": function (event) {
					this.isShow = true;
			},
			"onfinish": function (event) {
					this.isShow = true;
					if(this.replayindex>0 && this.replayindex<this.replays.length)
						this.playReplay(this.replayindex+1,this.replays[this.replayindex].url);
			},
			"onfail": function (event) {
					this.isShow = true;
					this.liveFail = true;
					this.clearLive();
			},
			liveErrorHit(){
				
			},
			getLiveDetail(){
				let liveId = buiweex.getPageParams().liveId;
				return ajax({
					url : 'ba/api/live/show',
					data : {
						id: liveId
					}
				}).then((res) =>{
					if(res.s===-20099){
						this.returnMsg = res.m;
					}
					else{
						this.liveDetail = res.r;
						this.liveDetail.outline = this.liveDetail.outlineStr;
						if(this.firstin&&this.liveDetail.liveStatus===1){
							this.playLive();
							this.firstin = false;
						}
						else if(this.liveFail){
							this.bgSrc = this.getPicture(this.liveDetail.picture);
							this.testLive();
						}
					}
				},(errorT,status) =>{
					this.bgSrc = this.getPicture(this.liveDetail.picture);
					this.errorShow = true;			
				})
			},
			testLive(){
				if(this.liveDetail.liveStatus===1){
					this.testVideo = this.liveDetail.videoHls;
					this.liveFail = false;
					setTimeout(()=>{
						if(!this.liveFail){
							this.playLive();
						}
					},25000)
				}		
			},
			clearLive(){
				this.bgSrc = this.getPicture(this.liveDetail.picture);
				this.videoSrc = null;
				this.testVideo = null;
			},
			playLive(){
				if(this.liveDetail.liveStatus===1){
					this.testVideo = null;
					this.videoSrc = this.liveDetail.videoHls;
					this.bgSrc = null;
					this.liveFail = false;
				}		
			},
			getReplays(){
				let liveId = buiweex.getPageParams().liveId;
				return ajax({
					url : 'ba/api/live/recording/list',
					data : {
						liveId: liveId
					}
				}).then((res) =>{
					this.replays = res.r;
				},(errorT,status) =>{
						extend(this.$refs.progress, {id:'progress', width:750, duration:1000, opacity:'0'});
				})
			},
			playReplay(index,url) {
				if(url.slice(-4)==='.flv'&&weex.config.env.platform === 'iOS'){
					this.flvErr = true;
					this.bgSrc = this.getPicture(this.liveDetail.picture);
				} 
				else {
					this.flvErr = false;
					this.videoSrc = url;
					this.liveFail = false;
					this.bgSrc = null;
				}
				this.replayindex = index;
			},
			closeDropdown () {
				this.isShowDropdown = false;
			},
			openDropdown (event) {
				this.isShowDropdown = true;
				this.$nextTick(()=>{
					this.$refs.dropdowns.open(event);
				});
			},
			share (event) {
				this.openDropdown(event);
			},
			getPicture (src) {
				let field = arguments[1];
				return fixedPic(src, field) || this.placeholder;
			},
			getDate (stamp){
				return formatDate(stamp,'MM月dd日 hh:mm');
			},
			connect: function(){
				websocket.WebSocket('ws://echo.websocket.org','');
				buiweex.alert('socket');
				websocket.onopen = function(e){
          buiweex.alert('网络已链接');
        }
				websocket.onclose = function(e){
					buiweex.alert('网络已断开');
				}
			}
		},
		created (){
				globalEvent.addEventListener("androidback", function (e){
							buiweex.pop();
				});
		},
		components : {
			dropdown,
			buiVideo,
			prompt
		},
		computed: {
			bgStyle () {
				return {
					width: '750px',
					height: '423px'
				}
			}
		},
	}
</script>

<style src="../../css/customer/live.css"></style>
<style src="../../css/layout.css"></style>
<style src="../../css/list.css"></style>
<style src="../../css/video.css"></style>
<style scope>
.span1{
	flex: 1;
}
</style>
