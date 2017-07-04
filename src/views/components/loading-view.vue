<template>
	<div class="loading-view">
		<bui-image :src="src" width="750px"  class="loading-img"></bui-image>
	</div>
</template>
<script>
	export default {
		props : {
			src : {
				type : String,
				default : ''
			}
		},
		data () {
			return {

			}
		},

	}
</script>
<style>
	.loading-view{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		flex : 1;
		
	}
	.loading-img{
		flex : 1;
	}
</style>