<template>
	<div class="comment-wrap">
		<text>comment</text>
		
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
			// buiweex.alert(buiweex.getPageParams().name);

			

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

<style>

	
</style>
