<template>
	<div>
		<bui-header
				:title="name"
				:leftItem="leftItem"
				@leftClick="back">
				
		</bui-header>
		<web ref="webview" :src="url" style="flex:1;width:750px;" @pagefinish="onfinish" @error="onfinish"></web>
		<progress ref="progress" :marginTop="getTop()"></progress>
	</div>
</template>
<script>
import buiweex from "../../js/buiweex.js";
import {extend} from "../../js/tool.js";
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
		methods:{
			back () {
					buiweex.pop();
			},
			getTop (){
				if(weex.config.env.platform==='iOS') return '117px';
				else return '100px';
			},
			"onfinish": function(){
				extend(this.$refs.progress,{id:'progress', width:750, duration:1000, opacity:'0'});
			}
		},

		mounted (){
			globalEvent.addEventListener("androidback", function (e){
				buiweex.pop();
			});
		}
	}
</script>