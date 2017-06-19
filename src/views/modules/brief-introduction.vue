<template>
	<div class="brief-introduction-wrap">
		
		<scroller class="span1">
			<div class="course-teacher">
				<text class="course-teacher-title">JAVA开发工程师专项课程</text>
			</div>
			<div class="teacher-score">
				<icon name="icon-edu" class="edu"></icon>
				<text class="teacher-name">黄讲师</text>
				<rate class="teacher-rate" :disabled="true" value="3"></rate>
			</div>
			<div class="learn-people-wrap">
				<text class="learn-title">TA们学习了这门课程</text>
				<div class="learn-people" @click="students">
					<scroller style="height:100px;" scroll-direction="horizontal" show-scrollbar=false class="learn-people-list" >
						<div class="learn-item"  v-for="item in 10">
							<!-- <div class="avatar"> -->
								<!-- <text class="avatar-name">张</text> -->
								<bui-image  @click="students" class="avatar-pic" src="/image/icon_kefu.png"></bui-image>
							<!-- </div> -->
							<text class="learn-name">张林</text>
						</div>
					</scroller>
					<text class="learn-people-count">550人</text>
					<icon class="learn-arrow" name="icon-right"></icon>
				</div>
			</div>
			<div class="course-desc">
				<text class="course-desc-title">课程简介</text>
				<div class="course-desc-list">
					
						
						<text class="course-desc-item" v-for="item in 10">{{item}}.掌握入门级基础知识
	</text>
					
				</div>
			</div>
		</scroller>
		<!-- <div class="course-footer">
			<button v-if="false"  value="参加课程" type="primary" size="large" radius="0"></button>
			<div class="operation">
				<div class="operation-item">
					<icon name="icon-comment" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">评论</text>
				</div>
				<div class="operation-item">
					<icon name="icon-edit" size="40px" class="operation-icon"></icon>
					<text class="operation-item-title">编辑</text>
				</div>
				<button class="learn-continue" type="primary" size="large" value="继续学习"></button>
			</div>
		</div> -->
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import rate from '../components/rate.vue';
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				
			}
		},
		mounted(){
			// buiweex.alert(buiweex.getPageParams().name);

			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
			},
			more() {

			},
			students () {
				buiweex.push(buiweex.getContextPath() + "/signUp-list.weex.js");
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
