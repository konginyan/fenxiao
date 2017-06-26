<template>
	<div class="prompt-wrap">
		<bui-image v-if="!$slots.default" :resize ="resize" class="prompt-img" :src="src" :style="imgStyle" @click="_click($event)" @load="_load()"></bui-image>
		<text v-if="!$slots.default" :style="textStyle" class="prompt-text" @click="_click($event)">{{text}}</text>
		<div v-if="$slots.default"><slot></slot></div>
	</div>
</template>

<script>
	export default {
		props : {
			src : {
				type : String,
				default : ''
			},
			text : {
				type : String,
				default : '暂无数据'
			},
			imgStyle : {
				type : Object,
				default : ()=>{
					return {}
				}
			},
			textStyle : {
				type : Object,
				default : ()=>{
					return {}
				}
			},
			resize: {
                type: String,
                default: "contain"
            }
		},
		data () {
			return {

			}
		},
		computed : {

		},
		methods: {
            "_click": function (e) {
                this.$emit('click',e);
            },
            "_load": function () {
                this.$emit('load');
            }
        }
	}
</script>

<style>
	.prompt-wrap{
		flex : 1;
		justify-content: center;
		align-items: center;
		padding-top: 100px;
		padding-bottom: 100px;
	}
	.prompt-img{
		width: 300px;
		height: 180px;
	}
	.prompt-text{
		margin-top: 50px;
		font-size: 28px;
		color : #666;
	}
</style>