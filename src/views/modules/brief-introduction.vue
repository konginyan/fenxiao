<template>
	<div class="brief-introduction-wrap">
		
		<scroller class="span1">
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
							<!-- <div class="avatar"> -->
								<!-- <text class="avatar-name">张</text> -->
								<bui-image  @click="students" class="avatar-pic" :src="item.url"></bui-image>
							<!-- </div> -->
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
					
						
						<text class="course-desc-item">{{outline}}
	</text>
					
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import rate from '../components/rate.vue';
import ajax from '../../js/ajax.js';
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				detail : {},
				attendList : [],
				courseId : '',
				outline : '',
				userList : []
			}
		},
		mounted(){
			this.courseId = buiweex.getPageParams().courseId;
			this.getDetail()
			
			this.getAttendList();
			

		},
		methods:{
			getDetail () {

				ajax({
					url : 'ba/api/course/show',
					data : {
						id : this.courseId,


					}
				}).then((res) =>{

					this.detail = res.r[0];
					this.outline = this.detail.outline.replace(/<.*?>/g,'');

					
				},(errorT,status) =>{
					
				})
			},
			getAttendList () {

				ajax({
					url : 'ba/api/course/attend/list',
					data : {
						id : this.courseId,
						rows : 5,
						page : 1


					}
				}).then((res) =>{
					res.r.forEach((item) => {
						ajax({
							url : 'uam/api/user/getUserById',
							data : {
								id : item.learnBy,

							}
							}).then((res) =>{
								let url = 'http://ba.depts.bingosoft.net:8088/uam/api/user/getUserById?id=';
								let obj = {
									url : url + item.learnBy,
									name : res.r.name
								}
								this.userList.push(obj);
								// buiweex.alert(this.userList)

								

								
							},(errorT,status) =>{
								
							})
					});
					
					
				},(errorT,status) =>{
					// buiweex.alert(errorT);
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
			}
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components : {
	    	rate
	    }
	}
</script>
<style src="../../css/customer/brief-introduction.css"></style>
<style>
.span1{
	flex: 1;
	padding-bottom: 70px;
}
	
</style>
