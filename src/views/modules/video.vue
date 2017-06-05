<template>
	<div class="index-wrap">
		<text>video</text>
		<bui-image src="/image/applogo.png" style="width: 80px;height:80px;"></bui-image>
		<bui-button value="22222" @click="back"></bui-button>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {}
		},
		mounted(){
			buiweex.alert(buiweex.getPageParams().name);

			globalEvent.addEventListener("androidback", function (e) {
			  buiweex.pop();
			});

		},
		methods:{
			back(){
				buiweex.pop();
			}
		}
	}
</script>

<style>

	
</style>
