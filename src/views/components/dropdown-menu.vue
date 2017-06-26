<template>
	<div class="dropdown-menu" :style="menuStyle">
		<text class="dropdown-item">列表1</text>
		<text class="dropdown-item">列表2</text>
		<text class="dropdown-item">列表3</text>
	</div>
</template>
<script>
	export default {
		props : {
			menuStyle : {
				type : Object,
				default : ()=>{
					return {}
				}
			}
		},
		data () {
			return {

			}
		},
		methods : {
			init (e={}) {
				console.log(e);
			}
		}
	}
</script>
<style>
	.dropdown-menu{
		/*position: absolute;*/
		top : 0px;
	    left: 0px;
	    right : 0px;
	    flex : 1;
	    background-color: #fff;
	    
	}
	.dropdown-item{
		flex : 1;
	    color : gray;
	    padding-top: 24px;
		padding-bottom: 24px;
		padding-left: 24px;
		padding-right: 24px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #ddd;
	}
	
	.dropdown-item:active{
		background-color:#eee;
	}
</style>