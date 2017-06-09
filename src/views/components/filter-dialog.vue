<template>
	<div class="filter-dialog-wrap" @click="onMask" >
		<div class="filter-dialog-mask">
			<div class="filter-dialog" :style="dialogStyle">
				<div class="filter-dialog-body">
					<slot name="body"></slot>
				</div>
				<div class="filter-dialog-foot">
					<slot name="foot"></slot>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
	export default {
		props : {
			
			top : {
				type : String,
				default : '150px'
			},
			radius : {
				type : String,
				default : '10px'
			}
		},
		data () {
			return {

			}
		},
		computed : {
			dialogStyle (){
				return {
					'top' : this.top,
					'border-radius' : this.radius
				}
			}
		},
		methods : {
			onMask (){
				this.$emit('onMask');
			}
		}
	}
</script>

<style>
	.filter-dialog-wrap{
		position : fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0,0,0,.5);
	}
	.filter-dialog{
		position: fixed;
		left: 20px;
		right: 20px; 
		background-color: #fff;
	}

</style>