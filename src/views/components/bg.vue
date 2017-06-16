<template>
	<div class="bg-wrap" :style="contentStyle">
		<image  class="bg"
				:src="imagePath"
				:resize="resize"
				:placeholder="placeholder"
				@click="_click($event)"
				@load="_load()"
				:style="cBgStyle"
				></image>
		<div class="layer">
			<slot></slot>
		</div>			
			
	</div>
</template>
<script>
import buiweex from '../../js/buiweex.js'
	export default {
		props : {
			src: {
			    type: String
			},
			resize: {
			    type: String,
			    default: "stretch"
			},
			bgStyle :{
				type : Object,
				default : () => {
					return {}
				}
			},
			contentStyle : {
				type : Object,
				default : () => {
					return {}
				}
			},
			width: {
			    type: String,
			    default : '750px'
			},
			height : {
				type: String,
				default : '100px'
			},
			placeholder: {
                type: String
            },

		},
		data () {
			return {

			}
		},
		computed : {
			imagePath () {
				if (this.src.indexOf("http") >= 0) {
                    return this.src;
                }
                //todo 兼容 src/image, /src/image , image/xxx, /image/xxx
                var bundleUrl = weex.config.bundleUrl;
                var url = bundleUrl.split('/').slice(0, -1).join('/');
                if (bundleUrl.indexOf("weex.html") > 0) {
                    url += "/dist/";
                }
                return url + this.src;
			},
			cBgStyle () {

				return this.combineStyle(this.bgStyle);
			}

		},
		methods: {
            _click (event) {
                this.$emit('click');
            },
            _load () {
                this.$emit('load');
            },
            combineStyle (style) {
            	let obj = {
            		width : this.width,
            		height : this.height
            	}
            	return Object.assign({},obj,style);
            }
        }
	}
</script>
<style>
	.bg-wrap{
		position: relative;
		left: 0;
		top: 0;
	}
	.bg{
		
	}
	.layer{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;

	}
</style>