<template>
	
		<div class="brief-introduction-wrap" ref="brief-introduction-wrap" style="flex : 1;width:750px;">
		<scroller style="flex : 1;width:750px;">
			<div class="brief-inner" ref="inner">
				<div class="course-teacher">
					<text class="course-teacher-title">{{detail.name}}</text>
				</div>
				<div class="teacher-score">
					<icon name="icon-edu" class="edu"></icon>
					<text class="teacher-name">{{detail.teacher}}</text>
					<rate class="teacher-rate" :disabled="true" :value="detail.score || 0"></rate>
				</div>
				<div class="learn-people-wrap">
					<text class="learn-title">TA们学习了这门课程</text>
					<div class="learn-people" @click="students">
						<scroller style="height:100px;" scroll-direction="horizontal" show-scrollbar=false class="learn-people-list" >
							<div class="learn-item"  v-for="item in userList">
								<div class="avatar">
									<!-- <text class="avatar-name">张</text> -->
									
									<bui-image width="54px" height="54px"  @click="students" class="avatar-pic" :src="item.picture" :placeholder="defaultAvatar"></bui-image>
								</div>
								<text class="learn-name">{{item.name}}</text>
							</div>
						</scroller>
						<text class="learn-people-count">{{detail.learnCount}}人</text>
						<icon class="learn-arrow" name="icon-right"></icon>
					</div>
				</div>
				<div class="course-desc">
					<text class="course-desc-title">课程简介</text>
					<div class="course-desc-list">
						<text class="course-desc-item">{{detail.outlineText}}</text>
						
					</div>
						
					
				</div>
			</div>
		</scroller>
		<!-- <div class="course-desc">
			<text class="course-desc-title">课程简介</text>
			<web style="width:750px;height:200px;" src="http://10.200.52.28:8090/ba/api/training/outline?id=14de0867-4f62-4d49-b402-e785c7a7544c&type=1&module=live"></web>
			
		</div> -->
		<progress ref="progress"></progress>
		</div>

</template>

<script>
import buiweex from "../../js/buiweex.js";
import rate from '../components/rate.vue';
import ajax from '../../js/ajax.js';
var globalEvent = weex.requireModule('globalEvent');
import linkapi from '../../js/linkapi.js';
import {extend} from "../../js/tool.js";
const dom = weex.requireModule('dom');
const storage = weex.requireModule('storage');
	export default {
		props : {
			increase : {
				type : Boolean,
				default : false
			}
		},
		data () {
			return {
				detail : {},
				attendList : [],
				courseId : '',
				userList : [],
				defaultAvatar : '/image/icon-avatar.png',
				isLoading : true,

			}
		},
		mounted(){
			this.init();
			// this.getWeb();

			/*linkapi.getUserInfo('972eb5ee-9b5b-43a0-8ced-cda3f33391a1',res=>{
				buiweex.alert(res)
			},err=>{
				buiweex.alert(err);
			})*/
			

		},
		methods:{

			init () {
				Promise.all([this.getAttendList(),this.getDetail()]).then((arr)=>{
					this.userList = arr[0];
					let detail = arr[1].r[0];
					this.detail = detail;
					// buiweex.alert(arr[0]);
					// detail.outline = detail.outline.replace(/<.*?>/g,'');

					let compareObj = (current,cache)=>{
                        let currentStr = JSON.stringify(current),
                            currentStrLen = currentStr.length,
                            cacheStr = JSON.stringify(cache),
                            cacheStrLen = cacheStr.length;
                        if (currentStr !== cacheStr && currentStrLen !== cacheStrLen) {
                        	// 以下两句应该是一样的效果，但是目前原因不明
                            cache = current;
                            // this.detail = current;
                            // buiweex.alert(this.detail);
                            // buiweex.alert('update!');
                        }else{
                            // buiweex.alert('no update!');	
                        }   
                        
                    }    
                    // compareObj(detail,this.detail);

					this.setCache(arr);
					// this.detail = detail;
					/*buiweex.show(this, {id: 'brief-introduction-wrap', duration: '300'});*/
					this.isLoading = false;
					extend(this.$refs.progress,{id:'progress', width:750, duration:2000, opacity:'0'});
					
				}).catch(reason => { 
                    /*buiweex.show(this, {id: 'brief-introduction-wrap', duration: '300'});*/
					extend(this.$refs.progress,{id:'progress', width:750, duration:2000, opacity:'0'});
                })
			},
			
			/*getWeb(){
				return ajax({
					url : 'ba/learn/course/outline',
					data : {
						id : '03248988-b60c-11e6-9c0c-d00d7a2cabb1',
					}
				}).then((res)=>{
					// buiweex.alert(111);
				},(errorT,status,err)=>{
					// buiweex.alert(0);
				});
			},*/
			getDetail () {

				return ajax({
					url : 'ba/api/course/show',
					data : {
						id : this.courseId,
					}
				})
			},
			getAttendList () {
				return new Promise((resolve,reject)=>{

					ajax({
						url : 'ba/api/course/attend/list',
						data : {
							id : this.courseId,
							rows : 10,
							page : 1


						}
					}).then((res) =>{

						let arrLearnBy = [];
						res.r.forEach((item) => {
							arrLearnBy.push(item.learnBy);

						});

						try{
							linkapi.getUserInfo(arrLearnBy,(res)=> {

								let tempArr = [];
								res.forEach(item=>{
									let obj = {
										picture : item.picture || '',
										name : item.userName || ''
									}

									tempArr.push(obj);
								})

								// this.userList = tempArr;
								resolve(tempArr);
								
								
							},(err)=>{
								// this.userList = [];
								reject([]);
								
							})
						}catch(e){
							// this.userList = [];
							reject([]);
							this.isLoading = false;

						}
				});

					
					
				},(errorT,status) =>{
					// buiweex.alert('getAttendList fail');
				})
			},
			setCache(value){
				storage.setItem(this.courseId,JSON.stringify(value));
			},
			getCache(){
                storage.getItem(this.courseId,(res)=>{
                    if (res.data != 'undefined') {
                        let arr = JSON.parse(res.data);
                        this.userList = arr[0];
                        let detail = arr[1] && arr[1].r && arr[1].r[0];
                        // detail.outline = detail.outline.replace(/<.*?>/g,'');
                        this.detail = detail;
                    }
                });
            },
			back(){
				buiweex.pop();
			},
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
			},
			more() {

			},
			students () {
				buiweex.push(buiweex.getContextPath() + "/students.weex.js",{
					courseId : this.courseId 
				});
			},
			finish () {
				const el = this.$refs.inner;
       			dom.scrollToElement(el, {
       				animated : false
       			})
   				buiweex.show(this, {id: 'brief-introduction-wrap', duration: '300'});

			},
			error () {
				buiweex.show(this, {id: 'brief-introduction-wrap', duration: '300'});
			}
		},
		created (){
			this.courseId = buiweex.getPageParams().courseId;
			this.getCache();
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components : {
	    	rate,

	    },
	    watch : {
	    	increase :function (val) {
	    		if (val) {
	    			this.detail.learnCount += 1;
	    		}

	    	}
	    }
	}
</script>
<style src="../../css/customer/brief-introduction.css"></style>

