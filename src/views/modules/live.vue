<template>
	<div class="live-wrap">
		<bui-content class="span1">
			<div>
				<bui-image src="/image/no-pic.png" class="live-block"></bui-image>
			</div>
			<div>
				<text>如果你无法简洁的表达你的想法，那只能说明你还不够了解他</text>
				<text>2323人预约</text>
			</div>
			<list>
				<cell>
					<text>主讲人</text>
					<text>张晓丽</text>
					<bui-icon name="icon-go"></bui-icon>
				</cell>
				<cell>
					<text>组织者</text>
					<text>黄丽</text>
					<bui-icon name="icon-go"></bui-icon>
				</cell>
			</list>
		</bui-content>

		<bui-image class="icon-back" src="/image/icon-back.png"></bui-image>
	  <bui-image class="icon-friendship" src="/image/icon-friendship.png"></bui-image>
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

<style src="../../css/customer/live.css"></style>
<style src="../../css/layout.css"></style>
<style src="../../css/list.css"></style>
<style>
.span1{
	flex: 1;
}
</style>
