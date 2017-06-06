<template>
	<div class="index-wrap">
		<bui-header
                title="分晓"
                :leftItem="leftItem"
                @centerClick="showDemo"
               
                >
                <icon @click="scan" slot="right" name="icon-scan" size="45px" color="#ffffff" class="pdl10"></icon>
        </bui-header>
       
		<bui-content>

			 <slider class="bui-slider banner" interval="1500" auto-play="true" offset-x-accuracy="0.1" @scroll="scrollHandler"
                    @change="changeHandler" infinite="false">
                <div class="bui-slider-pages" v-for="item in itemList">
                    <bui-image class="img slider-img" :src="item.pictureUrl"></bui-image>
                </div>
                <indicator class="bui-slider-indicator"></indicator>
            </slider>

            <div class="course-menu">
            	<div class="course-item">
            		<bui-image class="course-img" src="/image/icon-micro.png"></bui-image>
            		<text class="course-title">微课</text>
            	</div>
            	<div class="course-item">
            		<bui-image class="course-img" src="/image/icon-live.png"></bui-image>
            		<text class="course-title">直播课堂</text>
            	</div>
            	<div class="course-item">
            		<bui-image class="course-img" src="/image/icon-train.png"></bui-image>
            		<text class="course-title">培训班</text>
            	</div>
            </div>

		</bui-content>
       

		

		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');
var stream = weex.requireModule('stream');


	export default {
		data () {
			return {
				leftItem: {
                    icons: 'icon-back',
                },
                itemList: [
                    {
                        itemId: '520421163634',
                        pictureUrl: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'
                    },
                    {
                        itemId: '522076777462',
                        pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'
                    },
                    {
                        itemId: '522076777462',
                        pictureUrl: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'
                    },
                    {
                        itemId: '522076777467',
                        pictureUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491837948&di=3dcecd1b1d709196873a91f9fd585962&imgtype=jpg&er=1&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160304%2Fmp61863731_1457078539188_3.gif'
                    }
                ]
			}
		},
		methods : {
			back () {
	            buiweex.pop();
	        },
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js",{"name":"qinzhou"});
			},
			scan () {
				buiweex.push(buiweex.getContextPath() + "/video.weex.js");
			},
			"scrollHandler": function (e) {
                this.scrollHnadlerCallCount = this.scrollHnadlerCallCount + 1;
                this.topbarStyle = -e.offsetXRatio * 750
            },
            "changeHandler": function (e) {
                this.scrollHnadlerCallCount = 0;
            }
			
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
		components : {
			
		}
	}


</script>


<style src="../../css/customer/index.css" />
<style src="../../css/slider.css"></style>
<style >


</style>
