<template>
	<div class="comment-wrap">
		<div class="comment-subtitle">
			<text class="overall-merit">综合评价</text>
			<rate :disabled="true" color="#25aafe" :value="score" class="merit-rate"></rate>
			<text class="merit-total">({{count}}份评论)</text>
		</div>

		<bui-content class="span1">
		   

		  <list class="bui-list" >
		  		<refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
				         :display="refreshing ? 'show' : 'hide'">
				    <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
				    <text class="bui-refresh-indicator">{{refreshText}}</text>
				</refresh>

				<cell class="comment-list">
					<div class="comment-item" v-for="item in commentList">
						<div class="comment-inner">
							<bui-image class="avatar" src="/image/icon_kefu.png"></bui-image>
							<div class="reader-wrap">
								<text class="readers">李梅梅</text>
								<div class="date-wrap">
									<text class="date">{{fixedDate(item.updatedTime)}}</text>
									<!-- <text class="delete" @click="deleteComment(item)">删除</text> -->
								</div>
							</div>
							<rate :disabled="true" :value="item.score"></rate>
						</div>
						<text class="comment-text">{{item.content}}</text>
					</div>
					<prompt v-if="isShowPrompt" text="还没有评论" src="/image/empty-comment.png"></prompt>
				</cell>

				<loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
				    <text class="bui-loading-indicator">{{loadingText}}</text>
				</loading>

		  </list>
			<!-- <div class="comment-list">
				<div class="comment-item" v-for="item in commentList">
					<div class="comment-inner">
						<bui-image class="avatar" src="/image/icon_kefu.png"></bui-image>
						<div class="reader-wrap">
							<text class="readers">李梅梅</text>
							<div class="date-wrap">
								<text class="date">{{fixedDate(item.updatedTime)}}</text>
								<text class="delete" @click="deleteComment(item)">删除</text>
							</div>
						</div>
						<rate :disabled="true" :value="item.score"></rate>
					</div>
					<text class="comment-text">{{item.content}}</text>
				</div>
			</div> -->
		</bui-content>

		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import rate from '../components/rate.vue';
import ajax from '../../js/ajax.js';
import {formatDate} from '../../js/tool.js';
var globalEvent = weex.requireModule('globalEvent');
import prompt from '../components/prompt.vue';
	export default {
		data () {
			return {
				commentList : [],
				courseId : '',
				rows : 10,
				page : 1,
				count : 0,
				score : 0,
				refreshing: false,
                showLoading: false,
                refreshIcon: "icon-todown",
                refreshText: "下拉刷新...",
                loadingText: "正在加载更多数据...",
                isShowPrompt : false
			}
		},
		mounted(){
			// buiweex.alert(buiweex.getPageParams().name);
			this.courseId = buiweex.getPageParams().courseId;
			this.getComment()
			this.getCommentList();
			

		},
		methods:{
			// deleteComment (item) {
				
			// },
			getCommentList () {
				this.refreshIcon = "icon-loadding";
	        	this.refreshText = "正在刷新";
				ajax({
					url : 'ba/api/course/comments/list',
					data : {
						id : this.courseId,
						rows : this.rows,
						page : this.page
					}
				}).then((res) =>{
					this.commentList = res.r;
					if (this.commentList.length === 0) {
						this.isShowPrompt = true;
					}else{
						this.isShowPrompt = false;
					}
					this.refreshIcon = "icon-checkbox-on";
            		this.refreshText = "刷新成功";
            		this.refreshing = false;

					
				},(errorT,status) =>{
					this.refreshIcon = "icon-todown";
            		this.refreshText = "刷新失败";
            		this.refreshing = false;
				})
			},
			getMorePageList () {
				this.showLoading = true;
	        	this.page += 1;
				ajax({
					url : 'ba/api/course/comments/list',
					data : {
						id : this.courseId,
						rows : this.rows,
						page : this.page
					}
				}).then((res) =>{
					this.showLoading = false;
					this.isShowPrompt = false;
            		if(res.r.length === 0){
            			this.loadingText = '没有更多数据了';

            			return;
            		}else{
            			this.loadingText = '正在加载更多数据...';
            			
            		}
            		this.commentList = this.commentList.concat(res.r);
					
				},(errorT,status) =>{
					this.page -= 1;
            		this.showLoading = false;
				})
			},
			onRefresh () {
				this.refreshing = true;
                this.page = 1;
                this.getCommentList();
			},
			onPullingdown (e) {
				 //默认refresh文字与图标
                this.refreshIcon = "icon-todown";
                this.refreshText = "下拉刷新...";
                //下拉一定距离时文字与图标
                if (Math.abs(e.pullingDistance) > 80) {
                    this.refreshIcon = "icon-toup";
                    this.refreshText = "松开即可刷新...";
                }
			},
			onLoading () {
				 this.getMorePageList();
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
			},
			fixedDate (time) {
				return formatDate(time,'MM-dd hh:mm');
			}
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components : {
	    	rate,
	    	prompt
	    }
	}
</script>
<style>
	.span1{
		flex: 1;
	}
</style>
<style src="../../css/refresh.css"></style>
<style src="../../css/loading.css"></style>
<style src="../../css/customer/comment.css"></style>

