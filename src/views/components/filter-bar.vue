<template>
	<div class="filter-bar">
		<div class="filter-bar-item" v-for="item in filterItems" @click="selecteItem(item.index)">
			<text class="filter-bar-item-text" :class="[item.selected ?'text-active' : '']">{{item.title}}</text>
			<icon v-if="item.icon" class="filter-bar-item-icon" :class="[item.selected ?'icon-active' : '',item.selected && item.icon=='icon-arrow' ?'icon-rotate' : '']" :name="item.icon"></icon>
		</div>		
	</div>
</template>
<script>

	export default {
		props : {
			icon : {
				type : String,
				default : 'icon-arrow'
			},
			text : {
				type : String,
				default : ''
			},
			selected : {
				type : Boolean,
				default : false
			},
			filterItems: {default: []},
		},
		data () {
			return {

			}
		},
		methods : {
			selecteItem (index){
				this.filterItems.forEach((item)=>{
					if (item.index === index) {
						item.selected = true;
					} else {
						item.selected = false;
					}
				});
				this.$emit('change',index);
			}
		},
		computed : {
			
		}
	}
</script>
<style lang="sass">
	$filterActive : #25AAFE; 
	$filterDefault : #9B9B9B;
	$filterBorderBottom : #dedede;
	.filter-bar{
		flex-direction: row;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: $filterBorderBottom;
	}
	.filter-bar-item{
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-top: 24px;
		padding-bottom: 24px;
	}
	.filter-bar-item-text{
		font-size: 30px;
		color: $filterDefault;
		
	}
	.text-active{
		color: $filterActive;
	}
	.icon-active{
		color: $filterActive;
		
	}
	.icon-rotate{
		transform: rotate(180deg);
	}
	.filter-bar-item-icon{
		font-size: 30px;
		margin-left: 5px;
		color: $filterDefault;
		transform: rotate(0deg);
	}


</style>