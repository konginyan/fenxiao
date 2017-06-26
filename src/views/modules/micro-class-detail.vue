<template>
	<div class="micro-class-detail-wrap">
		<div class="video-wrap">
			<video class="bui-video"
	                   :src="src"
	                   controls
	                   play-status="pause"
	                   @start="onstart($event)"
	                   @pause="onpause($event)"
	                   @finish="onfinish($event)"
	                   @fail="onfail($event)"></video>
	        <bui-image v-if="isShow" @click="back" class="icon-back" src="/image/icon-back.png"></bui-image>
	        <bui-image v-if="isShow"  @click="share($event)" class="icon-friendship" src="/image/icon-friendship.png"></bui-image>           
		</div>
		<tab
                :tabItems="tabItems"
                :currentTab="currentTab"
                showSelectedLine="true"
                @load="onTabLoad"
                @itemClick="onTabItemClick"
				titleSize="30px"
				selectedColor = "#25aafe"
				normalColor = "#3a3a3a"
				:itemStyle = "itemStyle"
                >
        </tab>

		<div class="item-content" style="flex : 1;">
			
	        <tab-item tabId="tab1" :currentTab="currentTab" >
	        	<scroller style="flex : 1;">
	        		<brief-instroduction ></brief-instroduction>
	        	</scroller>
	        	
	        	
	        </tab-item>

	        <tab-item tabId="tab2" :currentTab="currentTab">
	        	<scroller style="flex : 1;">
	        		<catalog  @videoSrc="videoSrc"></catalog>
	        	</scroller>
	           
	        </tab-item>
	         <tab-item tabId="tab3" :currentTab="currentTab">
	            <comment style="flex:1;"></comment>
	        </tab-item>
		</div>
		
		<div class="course-footer">
			<button  v-if="!isAttend"  value="参加课程" type="primary" size="large" radius="0" @click="attend" class="attend-btn"></button>
			<div class="operation" v-if="isAttend">
				<div class="operation-item" @click="evaluate">
					<icon name="icon-comment" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">评论</text>
				</div>
				<div class="operation-item">
					<icon name="icon-edit" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">测试</text>
				</div>
				<button class="learn-continue" type="primary" size="large" value="继续学习"></button>
			</div>
		</div>           
		<dropdown
                :showArrow=true
                :show="isShowDropdown"
                @close="closeDropdown"
                ref="dropdowns">
            <div class="bui-list">
                <div class="bui-cell" v-for="item in shareList" @click="action(item)">
                    <div class="bui-list-left">
                        <icon :name="item['icon']"></icon>
                    </div>
                    <div class="bui-list-main">
                        <text class="bui-list-title">{{item.title}}</text>
                    </div>
                </div>
            </div>
        </dropdown>	
		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from '../../js/ajax.js';
import tab from '../../components/tab.vue';
import tabItem from '../../components/tab-item.vue';
import briefInstroduction from '../modules/brief-introduction.vue';
import catalog from '../modules/catalog.vue';
import comment from '../modules/comment.vue';
import dropdown from '../../components/bui-dropdown.vue';
var globalEvent = weex.requireModule('globalEvent');
import linkapi from '../../js/linkapi.js';

	export default {
		data () {
			return {
				//当前选择的tab
				currentTab: "",
				tabItems: [
				    {
				        tabId: "tab1",
				        title: "简介",
				    },
				    {
				        tabId: "tab2",
				        title: "目录"
				    },
				    {
				    	 tabId: "tab3",
				        title: "评论"
				    }
				],
				src: 'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4',
				leftItem: {
                    icons: 'icon-back',
                },
                detail : {},
                isAttend : false,
                isShow : true,
                isShowDropdown : false,
                shareList : [
                	{
                		icon : 'icon-share',
                		title : '分享给同事'
                	},
                	{
                		icon : 'icon-share',
                		title : '分享到社区'
                	}
                ]
			}
		},
		methods:{
			back(){
				buiweex.pop();
			},
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
			},
			action (item) {
				item = item.title;
				if (item === '分享给同事') {
					try{
						linkapi.shareToMessage({
							title : '视频',
							content : 'content',
							url : 'http://www.baidu.com',
							type : 'WEBSITE',
						});
					}catch(e){

					}
					


				}else if(item === '分享到社区'){
					try{

					}catch(e){
						linkapi.shareToBlog({
							title : '视频',
							content : 'content',
							url : 'http://www.baidu.com',
							type : 'WEBSITE',
						});
					}
					
				}
				this.closeDropdown();
			},
			 //选项卡加载完成事件,必须实现
            onTabLoad (tabId) {
                this.currentTab = tabId;
            },
            //选项卡点击事件,必须实现
            onTabItemClick(tabId) {
                this.currentTab = tabId;
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
            videoSrc (url) {
            	this.src = url;
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
            }
		},
		created (){
			
			
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    mounted (){
	    	this.getDetail();
	    },
	    computed : {
	    	itemStyle () {
	    		return {
	    			'padding-top' : '30px',
	    			'padding-bottom' : '24px',
	    			'background-color' : '#fff',
	    			'border-bottom-width' : '3px'
	    		}
	    	}
	    },
	    components : {
	    	// 'tabbar-scroll': require('../../components/tabbar-scroll.vue'),
	    	briefInstroduction,
	    	catalog,
	    	comment,
	    	tab,
	    	tabItem,
	    	dropdown
	
	    }
	}
</script>
<style src="../../css/list.css"></style>
<style src="../../css/video.css"></style>

<style src="../../css/customer/micro-class-detail.css"></style>
