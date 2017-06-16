<template>
	<div class="comment-wrap">
		<bui-content-scroll class="span1">
			
			<div class="comment-subtitle">
				<text class="overall-merit">综合评价</text>
				<rate :disabled="true" color="#25aafe" value="4" class="merit-rate"></rate>
				<text class="merit-total">(150份评论)</text>
			</div>
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
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {}
		},
		mounted(){
			// buiweex.alert(buiweex.getPageParams().name);

			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			deleteComment (item) {
				buiweex.toast(11);
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
