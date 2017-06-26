<template>
	<div class="dropdown-wrap" >
		<div class="dropdown" @click="dropdownClick($event)">
			<text class="dropdown-title">{{value}}</text>
			<icon class="dropdown-icon" name="icon-arrow"></icon>
		</div>
		<div class="dropdown-menu" v-if="isOpen">
			<text class="dropdown-item" v-for="item in 3" @click="itemClick(item)">列表{{item}}</text>

		</div>
	</div>
</template>
<script>
	export default {
		props : {
			value : {
				type : String,
				default : '下拉选择'
			},
			isOpen : {
				type : Boolean,
				default : false
			}
		},
		data () {
			return {

			}
		},
		methods : {
			dropdownClick (event) {
				// this.$emit('click',event);
				this.isOpen = !this.isOpen;
				console.log(this.value);
			},
			itemClick (item) {
				this.value = item;
				this.$emit('change',item);

				this.isOpen = false;
			}
		},
		/*watcher : {
			value : () {
				this.$emit('change',value);
			}
		}*/
	}
</script>
<style>
	.dropdown-wrap{
		position: relative;
		flex : 1;
	}
	.dropdown{
		flex : 1;
		flex-direction: row;
		/*justify-content: center;*/
		align-items: center;
		padding-top: 24px;
		padding-bottom: 24px;
		padding-left: 24px;
		padding-right: 24px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #ddd;

	}
	.dropdown:active{
		background-color:#eee;
	}
	.dropdown-title{
		flex : 1;
		lines : 1;
		text-overflow: ellipsis;
		font-size: 22px;
	}
	.dropdown-icon{
		
	}

	.dropdown-menu{
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