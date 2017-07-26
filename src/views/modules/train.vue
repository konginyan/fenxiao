<template>
	<div class="train-wrap">
		<bui-header title="培训班"
			:leftItem="leftItem"
			@leftClick = "back"			
			>
		</bui-header>
		<bui-content class="null">
			<bui-image class="null-pic" src="/image/null.png"></bui-image>
			<text class="null-text">该功能正在建设中</text>
		</bui-content>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				leftItem: {
					icons: 'icon-back',
				},
			}
		},
		mounted(){
			
		},
		methods:{
			back(){
				buiweex.pop();
			}
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	}
</script>

<style src="../../css/customer/null.css"></style>
<style>
</style>
