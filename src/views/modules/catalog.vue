<template>
	<div class="catalog-wrap">
		<scroller class="span1">
			<text class="catalog-subtitle">catalog</text>
			<div class="catalog-list">
				<div class="catalog-item" v-for="item in 10" @click="catalogSelect(item)">
					<text class="catalog-index" :class="[item===selectIndex ? 'catalog-active' : '']">{{item}}</text>
					<icon class="catalog-play " :class="[item===selectIndex ? 'catalog-active' : '']" name="icon-play" ></icon>
					<text class="catalog-title" :class="[item===selectIndex ? 'catalog-active' : '']">简介</text>
					<div class="catalog-total">127M</div>
					<icon class="catalog-down" name="icon-download"></icon>
					<icon v-if="false" class="catalog-loading" name="icon-loading"></icon>
				</div>
			</div>
		</scroller>
		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				selectIndex : 0,
			}
		},
		mounted(){
			 

			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			catalogSelect (index) {
				
				this.selectIndex = index;
			}
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	}
</script>
<style src="../../css/customer/catalog.css"></style>
<style>
	.span1{
		flex: 1;
		padding-bottom: 70px;
	}
</style>

