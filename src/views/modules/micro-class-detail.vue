<template>
	<div class="micro-class-detail-wrap">
		<div class="video-wrap">
			<bui-video class="bui-video"
						v-if="src"
                        :src="src"
                        :playstatus="videoState"
                        autoplay="true"
                       
                        @start="onstart($event)"
	                    @pause="onpause($event)"
	                    @finish="onfinish($event)"
	                    @fail="onfail($event)">
                        	
             </bui-video>
			 <bui-image v-if="isShowPoster" :src="detail.picture" class="poster" width="750px" height="418px" @click="posterHandler" placeholder="/image/no-pic.png"></bui-image>
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
		<div style="flex:1">
            <tab-item index="0" :currentTabIndex="currentTabIndex">
                 <!-- <scroller style="flex : 1;"> -->
	        		<brief-instroduction :increase="increase" :goTop="goTop"></brief-instroduction>
	        	<!-- </scroller> -->
            </tab-item>

            <tab-item index="1" :currentTabIndex="currentTabIndex">
                <scroller style="flex : 1;width:750px;">
   	        		<catalog :currentIndex="currentIndex" :catalogData="catalogData"  @videoSrc="videoSrc" @webSrc="webSrc"></catalog>
   	        	</scroller>
            </tab-item>
            <tab-item index="2" :currentTabIndex="currentTabIndex">
                 <comment style="flex:1;"></comment>
            </tab-item>
        </div>
		<div class="course-footer" v-if="detail.score !== null || detail.score !== undefined">
			<button  v-if="!detail.isAttend "  value="参加课程" type="primary" size="large" radius="0" @click="attend" class="attend-btn"></button>
			<div class="operation" v-if="detail.isAttend ">
				<div class="operation-item" @click="evaluate">
					<icon @click="evaluate" name="icon-comment" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">评论</text>
				</div>
				<div class="operation-item" @click="runTest">
					<icon name="icon-edit" @click="runTest" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">测试</text>
				</div>
				<button class="learn-continue" type="primary" size="large" value="继续学习" @click="learnContinue"></button>
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
import buiVideo from '../../components/bui-video.vue';
const storage = weex.requireModule('storage');
import {fixedPic,createArr,manageArr} from '../../js/tool.js';
	export default {
		data () {
			return {
				//当前选择的tab
				currentTab: "tab1",
				currentTabIndex: 0,
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
				src: '',
				videoState : 'pause',
				leftItem: {
                    icons: 'icon-back',
                },
                detail : {
                	picture : ''
                },
                isShow : true,
                isShowDropdown : false,
                isShowPoster : true,
                shareList : [
                	{
                		icon : 'icon-share',
                		title : '分享给同事'
                	},
                	{
                		icon : 'icon-share',
                		title : '分享到社区'
                	}
                ],
                firstVideoSrc : '',
                firstWebSrc : '',
                currentIndex : '01',
                inner : {},
                timer : null,
                isStart : false,
                increase : false,
                courseId : '',
                catalogData : {}

			}
		},
		methods:{
			back(){
				buiweex.pop();
			},

			action (item) {
				item = item.title;
				if (item === '分享给同事') {
					try{
						linkapi.shareToMessage({
							title : this.detail.name,
							content : '[OpenApp]\nappCode=com.ba.weex\nappUrl='+'micro-class-detail.weex.js?courseId='+this.courseId,
							type : 'action',
						});
					}catch(e){

					}
					


				}else if(item === '分享到社区'){
					try{
						linkapi.shareToBlog({
							title : this.detail.name,
							content : '[OpenApp]\nappCode=com.ba.weex\nappUrl='+'micro-class-detail.weex.js?courseId='+this.courseId,
							type : 'action',
						});
					}catch(e){
						
					}
					
				}
				this.closeDropdown();
			},
			 //选项卡加载完成事件,必须实现
            onTabLoad (tabId) {
                this.currentTab = tabId;
            },
            //选项卡点击事件,必须实现
            onTabItemClick(tabId,index) {
                this.currentTab = tabId;
                this.currentTabIndex = index;
            },
			getDetail () {
				return ajax({
					url : 'ba/api/course/show',
					data : {
						id : this.courseId,
					}
				})
			},
			"onstart": function () {
				this.isStart = true;
                this.isShow = false;
            },
            "onpause": function (event) {
                this.isShow = true;
            },
            "onfinish": function (event) {
                this.isShow = true;
            },
            "onfail": function (event) {
                this.isShow = true;
            },

            evaluate () {
            	buiweex.push(buiweex.getContextPath() + "/evaluate.weex.js",{
            		courseId : this.courseId
            	});
            },
            videoSrc (url) {
            	this.src = url;
            	this.isShowPoster = false;
            	this.videoState = 'play';
            },
            webSrc (url){

            },
            attend () {
            	ajax({
            		url : 'ba/api/course/attend',
            		method : 'POST',
            		data : {
            			id : this.courseId,
            		}
            	}).then((res) =>{
            		this.detail.isAttend = true;
            		buiweex.toast('报名成功');
            		this.increase = true;
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
            },
            learnContinue () {
            	let courseRecord = this.courseId +'record';
            	this.currentTab = 'tab2';
            	this.currentTabIndex = 1;
        		storage.getItem(courseRecord,e=>{
        			let data = {};
        			if (e.data != 'undefined') {
            			data = JSON.parse(e.data);
            			
        			}else{
        				data = this.inner;
        			}
        			let type = data.type;
        			this.currentIndex = data.cataIndex;
        			if (type === 'Video') {
        				this.src = data.url;
        				this.isShowPoster = false;
        				this.videoState = 'start';
        			}else if (type === 'html'){
        				buiweex.push(buiweex.getContextPath() + "/web.weex.js",{
        					url : data.url,
        					name : data.name || ''
        				});
        			}
        			
        		})

				
            },
            posterHandler () {
            	if (this.firstVideoSrc) {
            		this.isShowPoster = false;
            		this.src = this.firstVideoSrc;
            		this.videoState = 'start';

            	}else if(this.firstWebSrc){
            		buiweex.push(buiweex.getContextPath() + "/web.weex.js",{
						url : this.firstWebSrc,
						name : this.inner.name || ''
					});
            	}
            	
            	this.currentTab = 'tab2';
            	this.currentTabIndex = 1;
            },
            runTest () {
            	try{
            		linkapi.runApp({
            			appCode : 'BingoAbility',
            			appUrl : 'modules/test/index.html',
            			data : {
            				id : this.courseId,
            				type : 'course',
            				toType : 'test'
            			}
            		},()=>{

            		},(err)=>{
            			
            		});
            	}catch(e){

            	}
            },
            getCatalog() {
				return ajax({
					url : 'ba/api/course/catalogweex',
					data : {
						id : this.courseId,
					}
				})
			},
			catalogHandle(res){
				let flag = true;
				res.r && res.r.forEach(item=>{
					if (item.detailList.forEach) {
						item.detailList.forEach(inner=>{
							let type = inner.type;
							
							if (type === 'Video') {
								if (flag) {
									
									flag = false;
									this.firstVideoSrc = inner.url;
									this.inner = inner;

								}
							}else if (type === 'html'){
								if (flag) {
									flag = false;
									this.firstWebSrc = inner.url;
									this.inner = inner;
									
								}
							}
						})
					}
					
				})
			},
			init(){
				Promise.all([this.getDetail(),this.getCatalog()]).then((arr)=>{
					this.initData(arr);
					this.setCache(arr);
					/*let courseMicro = this.courseId + 'Micro';
					let arrObj = {
						id : courseMicro,
						data : arr
					};
					createArr('Micro');
					manageArr('Micro',arrObj,20);*/


					
				},()=>{

				});

			},
			setCache(value){
				storage.setItem(this.courseId + 'micro',JSON.stringify(value));
			},
			getCache(){
                storage.getItem(this.courseId + 'micro',(res)=>{
                    if (res.data != 'undefined') {
                        let arr = JSON.parse(res.data);
                        this.initData(arr);
                    }
                });
            },
            initData (arr) {
                let detail = arr[0].r[0];
				detail.picture = fixedPic(detail.picture);
				detail.isAttend = !!detail.isAttend;
				this.detail = detail;
				this.catalogHandle(arr[1]);
				this.catalogData = arr[1];
            }
		},
		created (){
			this.courseId = buiweex.getPageParams().courseId;
			this.getCache();
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    mounted (){
	    	this.init();
	    	
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
	    	briefInstroduction,
	    	catalog,
	    	comment,
	    	tab,
	    	tabItem,
	    	dropdown,
	    	buiVideo
	
	    }
	}
</script>
<style src="../../css/list.css"></style>
<style src="../../css/video.css"></style>

<style src="../../css/customer/micro-class-detail.css"></style>
