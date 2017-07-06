<template>
	<div class="tab-menu">
		<text class="tabs-item-text" @click="change(0)">1</text>
		<text class="tabs-item-text tabs-item-text-active"@click="change(1)" >2</text>
	</div>
</template>

<script>
import buiweex from '../../js/buiweex.js'
	export default {
		props : {
			width : {
				type : String,
				default : '0'
			},
			flex : {
				type : Number,
				default : 1
			}
		},
		data () {
			return {

			}
		},
		computed : {
			
		},
		mounted (){
			
		},
		methods : {
			change(index){
				this.$emit('change',index);
				
			}
		}
	}
</script>

<style>
	.tab-menu{
		flex-direction: row;
	}
	/*.tabs-item{
		flex: 1;
	}*/
	.tabs-item-text{
		flex : 1;
		padding-top: 30px;
		padding-bottom: 22px;
		font-size: 30px;
		text-align: center;
		color : #3A3A3A;
		border-bottom-width: 3px;
		border-bottom-style: solid;
		border-bottom-color: #fff;
	}
	.tabs-item-text-active{
		border-bottom-color: #25AAFE;
	}


</style>