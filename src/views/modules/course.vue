<template>
	<div class="course-wrap">
		<bg src="/image/record-header.png"
			height='529px'
			>
			<bui-header title="岗位课程"
				:leftItem="leftItem"
				@leftClick = "back"
				backgroundColor="transparent"				
				>
				<div>
					<text></text>
					<bui-icon></bui-icon>
				</div>
			</bui-header>
		</bg>
		
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
