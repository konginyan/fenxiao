<template>
	<div class="brief-introduction-wrap">
		<bui-content-scroll class="span1">
			<div class="course-teacher">
				<text>JAVA开发工程师专项课程</text>
			</div>
		</bui-content-scroll>
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
.span1{
	flex: 1;
}
	
</style>
