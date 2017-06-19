<template>
	<div class="evaluate-wrap">
		<bui-header
                title="评价"
                :leftItem="leftItem"
                @leftClick = "back"
                @centerClick="showDemo">
                <icon slot="right" name="icon-plane" color="#ffffff"></icon>
        </bui-header>
        <textarea class="evaluate-textarea" placeholder="给课程一个评价吧" value="" autofocus="true" rows="6" ></textarea>
		<div class="textarea-limit">
			<text class="current-number">19</text>
			<text class="split">/</text>
			<text class="total-number">100</text>
		</div>
		<div class="rate-panel">
			<rate @change="rateChange"  size="40px"></rate>
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
                rateArr : ['极差','差','一般','良好','极好'],
                rateValue : 5,
                rateText : '极好',
                courseId : '',
			}
		},
		methods : {
			back(){
				buiweex.pop();
			},
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
			},
			rateChange (val){
				
				this.rateText = this.rateArr[val-1];
				this.rateValue = val;
			},
			getEvaluateList () {

			} 
		},
		mounted () {
			this.courseId = buiweex.getPageParams().courseId;
			
		},
		components : {
			rate
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	}
</script>
<style src="../../css/customer/evaluate.css"></style>
