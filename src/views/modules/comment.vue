<template>
	<div class="comment-wrap">
		<div class="comment-subtitle">
			<text class="overall-merit">综合评价</text>
			<rate :disabled="true" color="#25aafe" :value="score" class="merit-rate"></rate>
			<text class="merit-total">({{count}}份评论)</text>
		</div>
		<bui-content-scroll class="span1">
			
			
			<div class="comment-list">
				<div class="comment-item" v-for="item in 10">
					<div class="comment-inner">
						<bui-image class="avatar" src="/image/icon_kefu.png"></bui-image>
						<div class="reader-wrap">
							<text class="readers">李梅梅</text>
							<div class="date-wrap">
								<text class="date">01-06 8:20</text>
								<text class="delete" @click="deleteComment(item)">删除</text>
							</div>
						</div>
						<rate :disabled="false" value="4"></rate>
					</div>
					<text class="comment-text">很好的课程，顶一个</text>
				</div>
			</div>
		</bui-content-scroll>

		
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
				commentList : [],
				courseId : '',
				rows : 10,
				count : 0,
				score : 0
			}
		},
		mounted(){
			// buiweex.alert(buiweex.getPageParams().name);
			this.courseId = buiweex.getPageParams().courseId;
			this.getComment()
			this.getCommentList();
			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			deleteComment (item) {
				
			},
			getCommentList () {
				ajax({
					url : 'ba/api/course/comments/list',
					data : {
						id : this.courseId,
						rows : this.rows,
						page : 1
					}
				}).then((res) =>{
					this.commentList = res.r;
					// buiweex.alert(res.r)
					
				},(errorT,status) =>{
					
				})
			},
			getComment () {
				ajax({
					url : 'ba/api/course/comments',
					data : {
						id : this.courseId,
					}
				}).then((res) =>{
					this.count = res.r[0].count;
					this.score = res.r[0].score;
					
					
				},(errorT,status) =>{
					
				})
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
<style>
	.span1{
		flex: 1;
		padding-bottom: 70px;
	}
</style>
<style src="../../css/customer/comment.css"></style>
