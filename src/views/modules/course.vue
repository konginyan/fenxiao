<template>
	<div class="course-wrap">
		<bui-content padded="true">
	        <text>course</text>
	    </bui-content>
		
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
