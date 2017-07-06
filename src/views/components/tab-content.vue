<template>
	<div class="tab-content">
			<div class="tab-item" v-for="index in 3" :ref="'item'+index" :style="setItemStyle">
				<text>{{index}}</text>
			</div>
	</div>
</template>

<script>
var animation = weex.requireModule('animation');
import buiweex from '../../js/buiweex.js'
	export default {
		props : {
			currentIndex : {
				type : Number,
				default : 0
			},
			itemWidth : {
				type : Number,
				default : 750
			}
		},
		data (){
			return {
				
			}
		},
		methods : {
			go (index) {
				this.unSelected(3);
				this.unSelected(2);
				this.selected(1);
			},
			selected (index) {
				let el = this.$refs.item + index;
				buiweex.alert(el);
				animation.transition(el, {
		          styles: {
		            transform: 'translate(0px, 0px)',
		            transformOrigin: 'center center'
		          },
		          duration: 200, //ms
		          timingFunction: 'ease',
		          delay: 0 //ms
		        }, function () {
		          // buiweex.alert('animation finished.')
		        })
			},
			unSelect (index) {
				let el = this.$refs.item + index;
				animation.transition(el, {
		          styles: {
		            transform: 'translate('+(this.itemWidth)+'px, 0px)',
		            transformOrigin: 'center center'
		          },
		          duration: 200, //ms
		          timingFunction: 'ease',
		          delay: 0 //ms
		        }, function () {
		          // buiweex.alert('animation finished.')
		        })
			}

			
			
		},
		computed : {
			setItemStyle () {
				let style = {
					width : this.itemWidth + 'px'
				};
				return Object.assign({},style);
			}
		},
		mounted () {
			this.go(this.currentIndex);
		},
		watch : {
			currentIndex (index){

				this.go(index);
			}
		}
	}
</script>

<style>
	.tab-content{
		position: relative;
		left: 0;
		top: 0;
		flex : 1;
		background-color: #abcedf;
	}
	.tab-item{
 		position: absolute;
		left: 0px;
		top: 0px; 
		right: 0;
		bottom: 0; 
		transform : translateX(750px);
		background-color: yellowgreen;
	}

</style>