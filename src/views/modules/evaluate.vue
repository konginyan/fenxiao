<template>
	<div class="evaluate-wrap">
		<bui-header
                title="评价"
                :leftItem="leftItem"
                @leftClick = "back"
                >
                <icon @click="submitEvaluate" slot="right" name="icon-plane" color="#ffffff"></icon>
        </bui-header>
        <textarea class="evaluate-textarea" placeholder="学完有收获吗？写点什么吧..." :value="content" autofocus="true" rows="6" @input="textInput"></textarea>
		<div class="textarea-limit">
			<text class="current-number">{{contentLength}}</text>
			<text class="split">/</text>
			<text class="total-number">100</text>
		</div>
		<div class="rate-panel">
			<rate @change="rateChange" :value="rateValue"  size="40px"></rate>
			<text class="rate-text">{{rateText}}</text>
		</div>

	</div>
</template>
<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');
import ajax from '../../js/ajax.js';
import rate from '../components/rate.vue';
	export default {
		data () {
			return {
				leftItem: {
                    icons: 'icon-back',
                },
                rateArr : ['较差','一般','良好','推荐','极佳'],
                rateValue : 5,
                rateText : '',
                courseId : '',
                content : '',
                contentLength : 0,
                courseId : ''
			}
		},
		methods : {
			back(){
				buiweex.pop();
			},
			rateChange (val){
				
				this.rateText = this.rateArr[val-1];
				this.rateValue = val;
			},
			getEvaluateList () {

			},
			submitEvaluate () {

				if (this.content.length === 0) {
					buiweex.toast('评论内容不能为空');
					return;
				}
				ajax({
					url : 'ba/api/course/comments/create',
					method : 'POST',
					data : {
						id : this.courseId,
						content : encodeURIComponent(this.content),
						score : this.rateValue
					}
				}).then((res) =>{
					buiweex.toast('评论成功');
					setTimeout(function () {
						buiweex.pop();
					},1000)
				},(errorT,status) =>{
					buiweex.toast('评论失败');
					
				})
			},
			textInput (e) {
				this.contentLength = e.value.length;
				
				if (this.contentLength < 100) {
					this.content = e.value;
				}else{
					this.contentLength = 100;
				}	
			}
		},
		computed : {
			
		},
		mounted () {
			// this.courseId = buiweex.getPageParams().courseId;
			
		},
		components : {
			rate
		},
		created (){
			this.courseId = buiweex.getPageParams().courseId;
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	}
</script>
<style src="../../css/customer/evaluate.css"></style>
