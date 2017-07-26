<template>
	<div class="train-wrap">
		<bui-header title="培训班"
			:leftItem="leftItem"
			@leftClick = "back"			
			>
		</bui-header>
		<!-- <bui-content class="span1">
			<list class="bui-list">
					        <refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
						         :display="refreshing ? 'show' : 'hide'">
				    <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
				    <text class="bui-refresh-indicator">{{refreshText}}</text>
				</refresh>
			
					        <cell v-for="i in 5">
		          <div class="live">
		            <div class="live-detail">
		              <div class="live-wrap">
		                <bui-image class="default-live" src="/image/no-pic.png" @click="toTrainDetail()"></bui-image>
		                <bui-image class="live-pic" src="/image/no-pic.png" @click="toTrainDetail()"></bui-image>
		              </div>
		              <text class="live-name">live.name</text>
		              <text class="live-book-count">getCount(live)</text>
		            </div>
		            <div class="live-bottom">
		              <div>
		                <text class="live-author-org">讲师</text>
		                <text class="live-author-name">live.teacher</text>
		              </div>
		              <div style="flex-direction:row; align-items:center;">
		                <text class="live-time">getStartTime(live)</text>
		                <div class="live-btn" :class="live-book-btn">
		                  <text class="live-book">getBtn(live)</text>
		                </div>
		              </div>
		            </div>
		          </div>
		        </cell>
		        <loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
		                    <text class="bui-loading-indicator" v-if="showLoading">{{loadingText}}</text>
		                    <loading-indicator class="bui-indicator"></loading-indicator>
		        </loading>
		              		</list>
		</bui-content> -->
		<bui-content class="null">
			<bui-image class="null-pic" src="/image/null.png"></bui-image>
			<text class="null-text">该功能正在建设中</text>
		</bui-content>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from "../../js/ajax.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				leftItem: {
					icons: 'icon-back',
				},
				page: 1,
				rows: 20,
				loadingText: "正在加载更多数据...",
				showLoading: false,
				refreshing: false,
				refreshIcon: "icon-todown",
				refreshText: "下拉刷新...",
			}
		},
		mounted(){
			
		},
		methods:{
			back(){
				buiweex.pop();
			},
			onLoading (e) {

			},
			onRefresh (e){
				this.refreshing = true;
             	this.page = 1;
			},
			onPullingdown (e) {
				if(!this.refreshing){
				  this.refreshIcon = "icon-todown";
				  this.refreshText = "下拉刷新...";
				}
				//下拉一定距离时文字与图标
				if (Math.abs(e.pullingDistance) > 150) {
				    this.refreshIcon = "icon-toup";
				    this.refreshText = "松开即可刷新...";
				}
			},
			toTrainDetail () {

			},
			getPicture () {

			}
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	}
</script>
<style scope>
.white-bg{
  border-top-style: solid;
  border-top-color: #dedede;
  border-top-width: 1px;
  background-color: white;
}
</style>
<style src="../../css/layout.css"></style>
<style src="../../css/list.css"></style>
<style src="../../css/customer/null.css"></style>
<style src="../../css/customer/live-list.css"></style>
<style>
</style>
