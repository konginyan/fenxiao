<template>
	<div class="catalog-wrap">
		<scroller class="span1">
			<text class="catalog-subtitle">目录</text>
			<div class="catalog-list">
				<div class="catalog-item" v-for="(item,index) in catalogList" @click="catalogSelect(index)">
					<text class="catalog-index" :class="[index===selectIndex ? 'catalog-active' : '']">{{index+1}}</text>
					<icon class="catalog-play " :class="[index===selectIndex ? 'catalog-active' : '']" name="icon-play" ></icon>
					<text class="catalog-title" :class="[index===selectIndex ? 'catalog-active' : '']">{{item.name}}</text>
					<div class="catalog-total">127M</div>
					<icon v-if="false" class="catalog-down" name="icon-download"></icon>
					<icon v-if="false" class="catalog-loading" name="icon-loading"></icon>
				</div>
			</div>
		</scroller>
		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from '../../js/ajax.js';
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				selectIndex : 0,
				courseId : '',
				catalogList : []
			}
		},
		mounted(){
			this.courseId = buiweex.getPageParams().courseId;
			this.getCatalog();	 

			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			catalogSelect (index) {
				
				this.selectIndex = index;
			},
			getCatalog() {
				ajax({
					url : 'ba/api/course/catalog',
					data : {
						id : '012a7214-d40d-11e6-a615-d00ddfc66d37',
					}
				}).then((res) =>{
					this.catalogList = res.r;
					// buiweex.alert(res.r)
					
				},(errorT,status) =>{
					
				})
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

