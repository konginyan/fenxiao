<template>
    <div @viewappear="onappear">
        <!--<loading-view v-if="isLoading" src="/image/gray.png"></loading-view> -->
        <list class="span1" @scroll="onScroll">
            <refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
                     :display="refreshing ? 'show' : 'hide'">
                <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
                <text class="bui-refresh-indicator">{{refreshText}}</text>
            </refresh>

            <cell>
                <slider ref="recommend" style="opacity: 0; width: 750px;height: 375px;" class="bui-slider banner" interval="1500" auto-play="true" offset-x-accuracy="0.1"
                        @scroll="scrollHandler"
                        @change="changeHandler" infinite="false">
                    <div :key="item" class="bui-slider-pages" v-for="item in recommendList">
                        <div class="slider-wrap">
                            <bui-image class="default-slider" src="/image/no-pic.png"
                                       @click="linkBanner(item)"></bui-image>
                            <bui-image @click="linkBanner(item)" class="img slider-item-img"
                                       :src="fixedPicture(item.picture)"></bui-image>
                        </div>
                    </div>
                    <indicator class="bui-slider-indicator small"></indicator>
                </slider>
            </cell>

            <cell>
                <div class="course-menu" ref="course-menu" style="width:750px;height:200px;opacity: 0;">
                    <div class="course-item" @click="microClass">
                        <bui-image @click="microClass" width="90px" height="90px"
                                   src="/image/icon-micro.png"></bui-image>
                        <text class="course-title">微课</text>
                    </div>
                    <div class="course-item">
                        <bui-image @click="liveList" width="90px" height="90px" src="/image/icon-live.png"></bui-image>
                        <text class="course-title">直播课堂</text>
                    </div>
                    <div class="course-item">
                        <bui-image @click="trainList" width="90px" height="90px"
                                   src="/image/icon-train.png"></bui-image>
                        <text class="course-title">培训班</text>
                    </div>
                </div>
            </cell>

           <!--  <cell class="trailer-wrap" v-if="lastact.length == 0">
               <bui-image src="/image/trailer.png" width="702px" height="236px"></bui-image>
           </cell> -->

            <cell>
                <div ref="lastact" style="opacity: 0; height: 260px;">
                    <div :key="item" class="trailer-wrap" v-for="item in lastact">
                        <bui-image @click="linkBanner(item)" src="/image/trailer1.png" width="702px"
                                   height="236px"></bui-image>
                        <div class="trailer-inner">
                            <div class="avatar-wrap">
                                <bui-image class="default-pic" src="/image/no-pic.png"
                                           @click="linkBanner(item)"></bui-image>
                                <bui-image @click="linkBanner(item)" :src="fixedPicture(item.picture)"
                                           class="course-item-img"></bui-image>
                            </div>
                            <div class="trailer-content">
                                <text class="trailer-title">{{item.name}}</text>
                                <text class="trailer-date">{{fiexedDate(item.created_time)}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>

            <cell>
                <div ref="select-wrap" class="select-wrap" style="width:750px;height:100px;opacity:0;">
                    <div class="h-line"></div>
                    <div class="select-content">
                        <text class="select-title">精选课程</text>
                        <text class="select-title-en">SELECTED COURSES</text>
                    </div>
                    <div class="h-line"></div>
                </div>
            </cell>

            <cell>
                <div class="course-list" ref="course" style="opacity: 0">
                    <div :key="item" class="course-list-item" v-for="item in hottestList"
                         @click="hottestLink(item.courseId)">
                        <div class="avatar-wrap">
                            <bui-image class="default-pic" src="/image/no-pic.png"
                                       @click="hottestLink(item.courseId)"></bui-image>
                            <bui-image class="course-item-img" :src="fixedPicture(item.picture)"
                                       @click="hottestLink(item.courseId)"></bui-image>
                        </div>
                        <div class="course-content">
                            <text class="course-item-title">{{item.name}}</text>
                            <text class="course-item-text">{{item.learnCount}}人学过</text>
                            <rate @change="rateChange" :value="Math.round(item.score)" :disabled="true"></rate>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <bg :src="navBackground"
            :contentStyle="contentStyle"
            :bgStyle="bgStyle"
            v-if="showNav"
        >
            <bui-header
                    title="分晓"
                    :leftItem="leftItem"
                    @leftClick="back"

                    :backgroundColor='navColor'
            >
                <icon @click="scan" slot="right" name="icon-scan" size="45px" color="#ffffff" class="pdl10"></icon>
            </bui-header>
        </bg>
    </div>
</template>

<script>
    import buiweex from "../../js/buiweex.js";
    import rate from '../components/rate.vue';
    var globalEvent = weex.requireModule('globalEvent');
    var config = weex.config;
    import ajax from '../../js/ajax.js';
    import {fixedPic, formatDate, departUrl} from '../../js/tool.js';
    import linkapi from '../../js/linkapi.js';

    export default {
        data () {
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                recommendList: [],
                hottestList: [],
                lastact: [],
                navBackground: '/image/NavBarBackground.png',
                navColor: 'transparent',
                showNav: true,
                refreshing: false,
                refreshIcon: "icon-todown",
                refreshText: "下拉刷新...",
                dropdownValue: '请选择',
                isLoading: true,
                currentIndex: 0
            }
        },
        computed: {
            bgStyle () {
                return {
                    height: '100px'
                }
            },
            contentStyle () {
                return {
                    position: 'absolute',
                    top: 0,
                    width: '750px',
                    height: '100px'
                }
            }
        },
        methods: {
            back () {
                buiweex.pop();
            },
            dropDownClick (e) {
                // console.log(e);

            },
            dropdownChange (val) {
                this.dropdownValue = val;
                console.log(val);
            },

            scan () {
                linkapi.scanCodeHandle({}, function (res) {
                    // buiweex.toast(res)
                }, function (err) {
                    // buiweex.toast(err)
                });
                // buiweex.push(buiweex.getContextPath() + "/video.weex.js");
            },
            "scrollHandler": function (e) {
                this.scrollHnadlerCallCount = this.scrollHnadlerCallCount + 1;
                //this.topbarStyle = -e.offsetXRatio * 750
            },
            "changeHandler": function (e) {
                this.scrollHnadlerCallCount = 0;
            },
            "onRefresh": function (e) {
                this.showNav = false;
                this.refreshing = true;
                this.refresh();
            },
            "onPullingdown": function (e) {
                if (!this.refreshing) {
                    this.refreshIcon = "icon-todown";
                    this.refreshText = "下拉刷新...";
                }
                //下拉一定距离时文字与图标
                if (config.env.platform === 'android') {
                    if (e.pullingDistance > 150) {
                        this.refreshIcon = "icon-toup";
                        this.refreshText = "松开即可刷新...";
                    }
                }
                if (config.env.platform === 'iOS') {
                    if (e.pullingDistance < -150) {
                        this.refreshIcon = "icon-toup";
                        this.refreshText = "松开即可刷新...";
                    }
                }
            },
            refresh () {
                this.refreshIcon = "icon-loadding";
                this.refreshText = "正在刷新";

                Promise.all([this.getHottestList(), this.getLastact()])
                    .then(() => {
                        this.refreshIcon = "icon-checkbox-on";
                        this.refreshText = "刷新成功";
                        setTimeout(() => {
                            this.refreshing = false;
                            this.showNav = true;
                        }, 1000)
                    })
            },
            onScroll(e){
                if (e.contentOffset.y < -60) {
                    this.navColor = '#4ca4fe';
                }
                else {
                    this.navColor = 'transparent';
                }
            },
            linkBanner (item){
                try{
                    let type = this.getRecordType(item);
                    if(type === 'Live') buiweex.push(buiweex.getContextPath() + "/live.weex.js",{
                        liveId : this.getMainId(item)
                    });
                    else if(type === 'Course') buiweex.push(buiweex.getContextPath() + "/micro-class-detail.weex.js",{
                        courseId : this.getMainId(item)
                    });
                    else if(type === 'Train') buiweex.push(buiweex.getContextPath() + "/train.weex.js");
                    else buiweex.alert('打开失败')
                }
                catch (e){
                    buiweex.push(buiweex.getContextPath() + "/web.weex.js",{
                        url : item.url,
                        name : item.name
                    });
                }
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
            trainList (){
                buiweex.push(buiweex.getContextPath() + "/train.weex.js");
            },
            getHottestList () {
                return ajax({
                    url: 'ba/api/course/gethottestlist'
                }).then((res) => {
                    
                    this.hottestList = res.r;
                }, (errorT, status) => {

                })
            },
            hottestLink (couseId) {
                buiweex.push(buiweex.getContextPath() + "/micro-class-detail.weex.js", {
                    courseId: couseId
                });
            },
            getMainId(rec){
                let obj = departUrl(rec.url);
                return obj.args[1].value;
            },
            getRecordType (rec) {
                let obj = departUrl(rec.url);
                return obj.args[0].value;
            },
            getRecommend () {
                return ajax({
                    url: 'ba/api/homepage/recommend',
                }).then((res) => {
                   
                    this.recommendList = res.r;
                }, (errorT, status) => {

                })
            },
            getLastact () {
                return ajax({
                    url: 'ba/api/homepage/lastact',
                }).then((res) => {
                    
                    this.lastact = res.r;

                }, (errorT, status) => {

                })
            },
            fixedPicture (source) {
                return fixedPic(source);
            },
            fiexedDate (time) {
                return formatDate(time, 'MM-dd hh:mm:ss')
            },
            init () {
            	Promise.all([this.getRecommend(),this.getLastact(),this.getHottestList()]).then(()=>{
            		buiweex.show(this, {id: 'course', duration: '300'});
            		buiweex.show(this, {id: 'recommend', duration: '300'});
            		buiweex.show(this, {id: 'lastact', duration: '300'});
            		buiweex.show(this, {id: 'course-menu', duration: '300'});
            		buiweex.show(this, {id: 'select-wrap', duration: '300'});
            		
            	});
                /*this.getRecommend();
                this.getLastact();
                this.getHottestList();*/
               
                
            },
            onappear () {

            }
        },
        created (){
            globalEvent.addEventListener("androidback", function (e) {
                buiweex.pop();
            });
        },
        components: {
            rate
        },
        mounted () {
            this.init();
        }
    }


</script>


<style src="../../css/customer/index.css"></style>
<style src="../../css/slider.css"></style>
<style src="../../css/refresh.css"></style>
<style src="../../css/customer/course-list.css"></style>
<style>
    .span1 {
        flex: 1;
    }

    .small {
        item-size: 15px;
    }
</style>
