<template>
	<div class="live-wrap">
		<bui-content class="span1">
			<div class="video-wrap" style="height:423px;">
				<video class="bui-video"
											src="http://114.67.23.110:8088/data/userdata/vod/transcode/201705/8ejXIdYu_pu.mp4"
											controls
											@start="onstart($event)"
											@pause="onpause($event)"
											@finish="onfinish($event)"
											@fail="onfail($event)"
											play-status="pause"></video>
						<bui-image v-if="isShow" @click="back" class="icon-back" src="/image/icon-back.png"></bui-image>
						<bui-image v-if="isShow"  @click="share($event)" class="icon-friendship" src="/image/icon-friendship.png"></bui-image>           
			</div>
			<scroller>
				<div class="summary-block">
					<text class="summary">如果你无法简洁的表达你的想法，那只能说明你还不够了解他</text>
					<text class="book-count">2323人预约</text>
				</div>
				<div>
					<list class="bobr-bottom">
						<cell class="live-item bobr">
							<text class="title">主讲人</text>
							<text class="name">张晓丽</text>
							<bui-icon class="icon-go" name="icon-go"></bui-icon>
						</cell>
						<cell class="live-item">
							<text class="title">组织者</text>
							<text class="name">黄丽</text>
							<bui-icon class="icon-go" name="icon-go"></bui-icon>
						</cell>
					</list>
				</div>
				<div v-if="playing" class="bobr-bottom">
					<text class="rep-title bobr">精彩回放</text>
					<div class="rep-block">
						<scroller scroll-direction="horizontal" class="rep-list">
							<div v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]">
								<div class="rep-circle">
									<text class="rep-index">{{item}}</text>
								</div>
							</div>
						</scroller>
					</div>
				</div>
				<div>
					<text class="intro bobr">直播简介</text>
					<div class="introduce" v-for="item in [1,2,3,4,5,6]">
						<text class="into-text">1ad156wd4w61dw6d1w65a1dasjk</text>
					</div>
				</div>
			</scroller>
		</bui-content>

		<!--<bui-image class="icon-back" src="/image/icon-back.png"></bui-image>
	  <bui-image class="icon-friendship" src="/image/icon-friendship.png"></bui-image>-->
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				leftItem: {
					icons: 'icon-back',
				},
				isShow: true,
				playing: false
			}
		},
		mounted(){
			
		},
		methods:{
			back(){
				buiweex.pop();
			},
			"onstart": function () {
					this.isShow = false;
					this.playing = true;
					// buiweex.alert(this.isShow);
			},
			"onpause": function (event) {
					this.isShow = true;
					// buiweex.alert(this.isShow);
			},
			"onfinish": function (event) {
					this.isShow = true;
			},
			"onfail": function (event) {
					this.isShow = true;
			},
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
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
