<template>
	<div class="tabs">
		<text class="tabs-item-text" >1</text>
		<text class="tabs-item-text tabs-item-text-active" >2</text>
		<!-- <div class="tabs-item">
			<text class="tabs-item-text">1</text>
		</div>
		<div class="tabs-item tabs-item">
			<text class="tabs-item-text tabs-item-text-active">2</text>
		</div> -->
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
			
		}
	}
</script>

<style>
	.tabs{
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