<template>
	<div class="filter-dialog-wrap"  @click="onMask">
		<div class="filter-dialog-mask">
			
		</div>
		<div class="filter-dialog" :style="dialogStyle">
				<div class="filter-dialog-body">
					<scroller >
						<slot name="body"></slot>
					</scroller>
					
				</div>
				<div class="filter-dialog-foot">
					<slot name="foot"></slot>
				</div>
			</div>
		
	</div>
</template>

<script>

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
		position : absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: rgba(0,0,0,.5);
	}
	.filter-dialog{
		position: absolute;
		left: 20px;
		right: 20px; 
		background-color: #fff;
	}

</style>