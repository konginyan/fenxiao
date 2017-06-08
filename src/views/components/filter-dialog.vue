<template>
	<div class="filter-dialog-wrap" v-if="isShow">
		<div class="filter-dialog-mask">
			<div class="filter-dialog">
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
	export default {
		props : {
			isShow : {
				type : Boolean,
				default : true
			}
		},
		data () {
			return {
				
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

</style>