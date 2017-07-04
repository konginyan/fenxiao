<template>
	<div class="web-wrap">
		<bui-header
					:title="name"
					:leftItem="leftItem"
					@leftClick="back"
					
					>
					
			</bui-header>
		<web ref="webview" :src="url" style="flex:1;"></web>
	</div>
</template>
<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');
const webview = weex.requireModule('webview');
	export default {
		data () {
			return {
				url : buiweex.getPageParams().url,
				name : buiweex.getPageParams().name,
				leftItem: {
						icons: 'icon-back',
				},
			}
		},
		methods : {
			back () {
					buiweex.pop();
			},
		},
		created (){
			globalEvent.addEventListener("androidback", function (e){
				buiweex.pop();
			});
		},
	}
</script>