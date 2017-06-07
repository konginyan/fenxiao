<template>
	<div class="rate">
		<div v-for="item in max" >
			<icon @click="selectValue(item)" name="icon-star" :class="[item<=currentValue ? 'active': '', 'star']"></icon>
			{{currentValue}}
		</div>
	</div>
</template>

<script>
	import buiweex from "../../js/buiweex.js";

	export default {
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
		},
		data : function() {
			return {
				currentValue: 0,
			}
		},
		methods : {
			selectValue(value) {

				if (this.disabled) {
					return;
				}

				this.currentValue = value;

			}
		},
		computed :{


			
		},
		watch : {
			currentValue (val){
				this.$emit('change', val);
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
	color : yellow;
}


</style>