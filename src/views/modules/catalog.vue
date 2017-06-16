<template>
	<div class="catalog-wrap">
		<bui-conetnt-scroll class="span1">
			<text class="catalog-subtitle">catalog</text>
			<div class="catalog-list">
				<div class="catalog-item" v-for="item in 10" @click="catalogSelect(item)">
					<text class="catalog-index" :class="{'catalog-active':true}">1</text>
					<icon class="catalog-play " name="icon-play" ></icon>
					<text class="catalog-title">简介</text>
					<div class="catalog-total">127M</div>
					<icon class="catalog-down" name="icon-download"></icon>
					<icon v-if="false" class="catalog-loading" name="icon-loading"></icon>
				</div>
			</div>
		</bui-conetnt-scroll>
		
		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				slectIndex : 0,
			}
		},
		mounted(){
			 

			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			catalogSelect (index) {
				
				this.slectIndex = index;
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
<style src="../../css/customer/catalog.css"></style>
