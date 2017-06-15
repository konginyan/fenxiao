<template>
	<div class="micro-class-detail-wrap">
		<div class="video-wrap">

			<video class="bui-video"
	                   :src="src"
	                   controls
	                   play-status="pause"
	                   @start="onstart($event)"
	                   @pause="onpause($event)"
	                   @finish="onfinish($event)"
	                   @fail="onfail($event)"></video>
		</div>
		<tabbar-scroll :tabItems="tabItems"
		                     selectedIndex="0"
		                     :scroll="false"
		                     itemClass = 'tab-item'
		                     top="400px" @tabItemOnClick="tabItemOnClick"></tabbar-scroll>
		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				tabItems: [
				    {
				        index: 0,
				        title: '简介',
				        selected: false,
				        src: '/brief-introduction.weex.js',
				        visibility: 'visible',
				    },
				    {
				        index: 1,
				        title: '目录',
				        selected: false,
				        src: '/catalog.weex.js',
				        visibility: 'hidden',
				    },
				    {
				        index: 2,
				        title: '评论',
				        selected: false,
				        src: '/comment.weex.js',
				        visibility: 'hidden',
				    }
				],
				state: '---',
				src: 'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4'
			}
		},
		mounted(){
			

		},
		methods:{
			back(){
				buiweex.pop();
			},
			tabItemOnClick: function (e) {
			    buiweex.toast("tab" + e.index);
			    //设置标题栏
			    // this.currentTab = this.tabItems[e.index].title;
			},
			initPath () {
				for (var i = 0; i < this.tabItems.length; i++) {
	                var path = this.tabItems[i].src;
	                this.tabItems[i].src = buiweex.getContextPath() + path;
	            }
			},
			"onstart": function () {
                console.log(this.stateall);
                this.stateall = '55555';
                console.log(this.stateall);
            },
            "onpause": function (event) {
                console.log(event);
                console.log(this.state);
                this.state = 'onpause';
                console.log(this.state);
            },
            "onfinish": function (event) {
                this.state = 'onfinish'
            },
            "onfail": function (event) {
                this.state = 'onfinish'
            }
		},
		created (){
			this.initPath();
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components : {
	    	'tabbar-scroll': require('../../components/tabbar-scroll.vue'),

	
	    }
	}
</script>
<style src="../../css/video.css"></style>

<style src="../../css/customer/micro-class-detail.css"></style>
<style>

</style>
