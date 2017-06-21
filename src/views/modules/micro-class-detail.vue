<template>
	<div class="micro-class-detail-wrap">
		<div class="video-wrap">
				<!-- <bui-header
                title="分晓"
                @leftClick="back"
                @centerClick="showDemo"
                :leftItem="leftItem"
                >
                <icon @click="more" slot="right" name="icon-more" size="45px" color="#ffffff" class="pdl10"></icon>
        		</bui-header> -->
			<video class="bui-video"
	                   :src="src"
	                   controls
	                   play-status="pause"
	                   @start="onstart($event)"
	                   @pause="onpause($event)"
	                   @finish="onfinish($event)"
	                   @fail="onfail($event)"></video>
	        <bui-image v-if="isShow" @click="back" class="icon-back" src="/image/icon-back.png"></bui-image>
	        <bui-image v-if="isShow" class="icon-friendship" src="/image/icon-friendship.png"></bui-image>           
		</div>
		<tabbar-scroll :tabItems="tabItems"
		                     selectedIndex="0"
		                     :scroll="false"
		                     top="437px" @tabItemOnClick="tabItemOnClick"></tabbar-scroll>
		<div class="course-footer" style="position: absolute;bottom: 0px;left:0;right:0;">
			<button  v-if="!isAttend"  value="参加课程" type="primary" size="large" radius="0" @click="attend"></button>
			<div class="operation" v-if="isAttend">
				<div class="operation-item" @click="evaluate">
					<icon name="icon-comment" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">评论</text>
				</div>
				<div class="operation-item">
					<icon name="icon-edit" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">编辑</text>
				</div>
				<button class="learn-continue" type="primary" size="large" value="继续学习"></button>
			</div>
		</div>                     

		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from '../../js/ajax.js';
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				tabItems: [
				    {
				        index: 0,
				        title: '简介',
				        selected: false,
				        src: '/brief-introduction.weex.js',
				        visibility: 'visible',
				        titleSize : 30,
				    },
				    {
				        index: 1,
				        title: '目录',
				        selected: false,
				        src: '/catalog.weex.js',
				        visibility: 'hidden',
				        titleSize : 30,
				    },
				    {
				        index: 2,
				        title: '评论',
				        selected: false,
				        src: '/comment.weex.js',
				        visibility: 'hidden',
				        titleSize : 30,
				    }
				],
				src: 'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4',
				leftItem: {
                    icons: 'icon-back',
                },
                detail : {},
                isAttend : false,
                isShow : true
			}
		},
		methods:{
			back(){
				buiweex.pop();
			},
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
			},
			more () {

			},
			tabItemOnClick: function (e) {
			    // buiweex.toast("tab" + e.index);
			    //设置标题栏
			    // this.currentTab = this.tabItems[e.index].title;
			},
			initPath () {
				for (var i = 0; i < this.tabItems.length; i++) {
	                var path = this.tabItems[i].src + '?courseId='+buiweex.getPageParams().courseId;
	                this.tabItems[i].src = buiweex.getContextPath() + path;
	            }
			},
			getDetail () {
				let courseId = buiweex.getPageParams().courseId;
				ajax({
					url : 'ba/api/course/show',
					data : {
						id : courseId,


					}
				}).then((res) =>{
					// this.detail = res.returnval;
					this.detail = res.r[0];
					this.isAttend = !!this.detail.isAttend;
					
				},(errorT,status) =>{
					
				})
			},
			"onstart": function () {
                this.isShow = false;
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
            evaluate () {
            	buiweex.push(buiweex.getContextPath() + "/evaluate.weex.js",{
            		courseId : buiweex.getPageParams().courseId
            	});
            },
            attend () {
            	ajax({
            		url : 'ba/api/course/attend',
            		method : 'POST',
            		data : {
            			id : buiweex.getPageParams().courseId,
            		}
            	}).then((res) =>{
            		this.isAttend = true;
            		buiweex.toast('报名成功');
            	},(errorT,status) =>{
            		buiweex.toast('报名失败');
            	})
            }
		},
		created (){
			this.initPath();
			
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    mounted (){
	    	this.getDetail();
	    },
	    components : {
	    	'tabbar-scroll': require('../../components/tabbar-scroll.vue'),

	
	    }
	}
</script>
<style src="../../css/video.css"></style>

<style src="../../css/customer/micro-class-detail.css"></style>
