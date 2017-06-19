<template>
	<div class="rate">
		<div v-for="item in max">
			<icon v-if="item<=value" :size="size" @click="selectValue(item)" name="icon-star" class="star" :style="{'color':color}"></icon>
			<icon  v-if="item>value" @click="selectValue(item)" name="icon-star" :size="size" class="star" :style="{'color':'#dedede'}"></icon>
		</div>
		<!-- <text>{{value}}</text> -->
	</div>
</template>

<script>
	// import buiweex from "../../js/buiweex.js";

	export default {
		data () {
			return {
				
			}
		},
		props : {
			value: {
		        type: Number,
		        default: 0
		    },
		    max: {
		        type: Number,
		        default: 5
		    },
		    disabled: {
	            type: Boolean,
	            default: false
	        },
	        color : {
	        	type : String,
	        	default : '#FFC600'
	        },
	        size : {
	        	type : String,
	        	default : '35px'
	        }
		},
		
		methods : {
			selectValue(value) {
				if (this.disabled) {

					return;
				}
				this.value = value;
				// buiweex.toast(this.value);
				this.$emit('change', value);
			}
		}
		
	}
</script>

<style>
.rate{
	flex-direction: row;
}
.star{
	color : #dedede;
	margin-right: 5px;
}
.active{
	color : #FFC600;
}


</style>