<template>
	
		<div class="brief-introduction-wrap" ref="brief-introduction-wrap" style="opacity:0;flex : 1;width:750px;">
		<scroller style="flex : 1;width:750px;">
			<!-- <loading-view v-if="isLoading" src="/image/gray.png"></loading-view> -->
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
						<text class="course-desc-item">{{outline}}</text>
						
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
// import loadingView from '../components/loading-view.vue';
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
				outline : '',
				userList : [],
				defaultAvatar : '/image/icon-avatar.png',
				isLoading : true,

			}
		},
		mounted(){
			this.courseId = buiweex.getPageParams().courseId;
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
				Promise.all([this.getAttendList(),this.getDetail()]).then(()=>{
					
					buiweex.show(this, {id: 'brief-introduction-wrap', duration: '300'});
					this.isLoading = false;
					extend(this.$refs.progress,{id:'progress', width:750, duration:1000, opacity:'0'});
				},()=>{

					buiweex.show(this, {id: 'brief-introduction-wrap', duration: '300'});
					extend(this.$refs.progress,{id:'progress', width:750, duration:1000, opacity:'0'});

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
				}).then((res) =>{
					this.detail = res.r[0];
					this.outline = this.detail.outline.replace(/<.*?>/g,'');
					
				},(errorT,status) =>{
					// buiweex.alert('getDetail fail');
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

								this.userList = tempArr;
								resolve(this.userList);
								
								
							},(err)=>{
								this.userList = [];
								reject(this.userList);
								
							})
						}catch(e){
							this.userList = [];
							reject(this.userList);
							this.isLoading = false;

						}
				});

					
					
				},(errorT,status) =>{
					// buiweex.alert('getAttendList fail');
				})
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
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components : {
	    	rate,
	    	// loadingView
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

