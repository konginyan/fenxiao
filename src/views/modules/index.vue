<template>
	<div>
		<bui-header
                title="分晓"
                :leftItem="leftItem"
                @centerClick="showDemo"
                >
                <icon @click="scan" slot="right" name="icon-scan" size="45px" color="#ffffff" class="pdl10"></icon>
        </bui-header>
	
       	<bui-content-scroll class="span1">
			<div>
				 <slider class="bui-slider banner" interval="1500" auto-play="true" offset-x-accuracy="0.1" @scroll="scrollHandler"
	                    @change="changeHandler" infinite="false" >
	                <div class="bui-slider-pages" v-for="item in recommendList" >
	                    	<bui-image @click="linkBanner(item)" class="img slider-img" :src="fixedPicture(item.picture)"></bui-image>
	                </div>
	                <indicator class="bui-slider-indicator"></indicator>
	            </slider>

	            <div class="course-menu">
	            	<div class="course-item" @click="microClass">
	            		<bui-image @click="microClass" class="course-img" src="/image/icon-micro.png" ></bui-image>
	            		<text class="course-title">微课</text>
	            	</div>
	            	<div class="course-item">
	            		<bui-image @click="liveList" class="course-img" src="/image/icon-live.png"></bui-image>
	            		<text class="course-title">直播课堂</text>
	            	</div>
	            	<div class="course-item">
	            		<bui-image class="course-img" src="/image/icon-train.png"></bui-image>
	            		<text class="course-title">培训班</text>
	            	</div>
	            </div>

	            <div class="trailer-wrap" v-for="item in lastact">
	            	<bui-image src="/image/trailer.png" style="width: 702px;height:236px;"></bui-image>
	            	<div class="trailer-inner">
	            		<bui-image :src="fixedPicture(item.picture)" class="trailer-img"></bui-image>
	            		<div class="trailer-content">
	            			<text class="trailer-title">{{item.name}}</text>
	            			<text class="trailer-date">{{fiexedDate(item.created_time)}}</text>
	            		</div>
	            	</div>
	            </div>
				
				<div class="select-wrap">
					<div class="h-line"></div>
					<div class="select-content">
						<text class="select-title">精选课程</text>
						<text class="select-title-en">SELECTED COURSES</text>
					</div>
					<div class="h-line"></div>
				</div>
				<div class="course-list">
					<div class="course-list-item" v-for="item in hottestList" @click="hottestLink(item.courseId)">
						<bui-image class="course-item-img" :src="fixedPicture(item.picture)" @click="hottestLink(item.courseId)"></bui-image>
						<div class="course-content">				
							<text class="course-item-title">{{item.name}}</text>
							<text class="course-item-text">{{item.learnCount}}人学过</text>
							<rate @change="rateChange" :value="Math.round(item.score)" :disabled="true"></rate>
						</div>
					</div>
				</div>

			</div>
        </bui-content-scroll>

		

		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import rate from '../components/rate.vue';
var globalEvent = weex.requireModule('globalEvent');
import ajax from '../../js/ajax.js';
import {fixedPic,formatDate} from '../../js/tool.js';

	export default {
		data () {
			return {
				leftItem: {
                    icons: 'icon-back',
                },
                recommendList: [],
                hottestList : [],
                lastact : {}
                
			}
		},
		computed : {
			
		},
		methods : {
			back () {
	            buiweex.pop();
	        },
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
			},
			scan () {
				// buiweex.push(buiweex.getContextPath() + "/video.weex.js");
			},
			"scrollHandler": function (e) {
                this.scrollHnadlerCallCount = this.scrollHnadlerCallCount + 1;
                this.topbarStyle = -e.offsetXRatio * 750
            },
            "changeHandler": function (e) {
                this.scrollHnadlerCallCount = 0;
            },
            linkBanner (item){
            	// buiweex.alert(item.name);
            },
            rateChange (val){
            	buiweex.toast(val);
            },
            microClass (){
            	buiweex.push(buiweex.getContextPath() + "/micro-class.weex.js");
            },
						liveList (){
            	buiweex.push(buiweex.getContextPath() + "/live-list.weex.js");
            },
            getHottestList () {
            	ajax({
            		url : 'ba/api/course/gethottestlist'
            	}).then((res) =>{
            		this.hottestList = res.r;
            	},(errorT,status) =>{
            		
            	})

            },
            hottestLink (couseId) {
            	buiweex.push(buiweex.getContextPath() + "/micro-class-detail.weex.js",{
            		courseId : couseId
            	});
            },
            getRecommend () {
            	ajax({
            		url : 'ba/api/course/gethottestlist',
            	}).then((res) =>{
            		this.recommendList = res.r;
            	},(errorT,status) =>{
            		
            	})
            },
            getLastact () {
         
            	ajax({
            		url : 'ba/api/homepage/lastact',
            	}).then((res) =>{
            		this.lastact = res.r;
            	},(errorT,status) =>{

            	})

            },
            fixedPicture (source) {
            	return fixedPic(source);
            },
            fiexedDate (time) {
            	return formatDate(time,'MM-dd hh:mm:ss')
            }
            
			
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
		components : {
			rate,
		},
		mounted () {
			this.getHottestList();
			this.getRecommend();
			this.getLastact();

			
		}
	}


</script>


<style src="../../css/customer/index.css" />
<style src="../../css/slider.css"></style>
<style src="../../css/customer/course-list.css" />
<style >
	.span1{
		flex: 1;
	}

</style>
