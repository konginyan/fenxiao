<template>
  <div class="live-list-wrapper">
    <bui-header title="直播课堂"
      :leftItem="leftItem"
      @leftClick = "back"	
      >
    </bui-header>
    <bui-content v-if="lives.length>0" class="span1">
      <list class="bui-list">
        <refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
				         :display="refreshing ? 'show' : 'hide'">
				    <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
				    <text class="bui-refresh-indicator">{{refreshText}}</text>
				</refresh>

        <cell :key="live" v-for="live in lives">
          <div class="live">
            <div class="live-detail">
              <bui-image class="live-img" :src="getPicture(live.picture)" @click="toLive(live)"></bui-image>
              <text class="live-name">{{live.name}}</text>
              <text class="live-book-count">{{getCount(live)}}</text>
            </div>
            <div class="live-bottom">
              <div>
                <text class="live-author-org">讲师</text>
                <text class="live-author-name">{{live.teacher}}</text>
              </div>
              <div style="flex-direction:row; align-items:center;">
                <gif v-if="btnStyle(live)===1" class="onlive" :frames="images" width="80px" height="80px"></gif>
                <text v-if="!(btnStyle(live)===1)" class="live-time">{{getStartTime(live)}}</text>
                <div class="live-btn" @click="liveTrigger(live)" :class="[btnStyle(live)===0?'live-book-btn':'',
                                               btnStyle(live)===1?'live-enter-btn':'',
                                               btnStyle(live)===2?'live-end-btn':'']">
                  <text :class="[btnStyle(live)===0?'live-book':'',
                      btnStyle(live)===1?'live-enter':'',
                      btnStyle(live)===2?'live-end':'']">{{getBtn(live)}}</text>
                </div>
              </div>
            </div>
          </div>
        </cell>
        <loading class="bui-loading white-bg" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
          <text class="bui-loading-indicator">{{loadingText}}</text>
        </loading>
      </list>
    </bui-content>
    <bui-content v-if="lives.length===0" class="null">
			<bui-image class="null-pic2" src="/image/no-live.png"></bui-image>
			<text class="null-text">当前没有直播</text>
		</bui-content>
  </div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from "../../js/ajax.js";
import {fixedPic, departUrl, secondToTime, formatDate} from "../../js/tool.js";
import gif from "../components/gif.vue"
export default {
  components:{
    gif
  },
  data () {
    return {
      leftItem: {
        icons: 'icon-back',
      },
      lives:[],
      page: 1,
      rows: 20,
      loadingText: "正在加载更多数据...",
      showLoading: false,
      refreshing: false,
      refreshIcon: "icon-todown",
      refreshText: "下拉刷新...",
      images: [
        '/dist/image/play1.png',
        '/dist/image/play2.png',
        '/dist/image/play3.png'
      ]
    }
  },
  mounted(){
    this.getLives();
  },
  methods:{
    back(){
      buiweex.pop();
    },
    getLives(){
      this.refreshIcon = "icon-loadding";
	    this.refreshText = "正在刷新";
      ajax({
        url : 'ba/api/live/list',
        data : {
          page : this.page,
          rows : this.rows
        }
      }).then((res) =>{
        this.page += 1;
        if(res.r.length === 0){
          this.loadingText = '没有更多数据了';
          setTimeout(()=>{
            this.showLoading = false;
          },500)
          return;
        }else{
          this.loadingText = '正在加载更多数据...';
        }
        this.showLoading = false;
        if(this.page===2) this.lives = res.r;
        else res.r.forEach((live)=>{
          this.lives.push(live);
        })
        console.log(this.lives);
        this.refreshIcon = "icon-checkbox-on";
        this.refreshText = "刷新成功";
        this.refreshing = false;
      },(errorT,status) =>{
        this.refreshing = false;
        this.refreshIcon = "icon-todown";
        this.refreshText = "刷新失败";
      })
    },
    getPicture (src) {
      let field = arguments[1];
      return fixedPic(src, field) || this.placeholder;
    },
    getStatus (live){
      return live.liveStatus;
    },
    getCount (live) {
      switch(live.liveStatus){
        case 0: return '预约人数: ' + (live.appointmentCount||0) + '人';
        case 1: return '在线人数: ' + (live.liveCount||0) + '人';
        case 2: return '学习人数: ' + (live.recordingCount||0) + '人';
      }
    },
    getStartTime (live) {
      return formatDate(live.startTime, 'MM月dd日 hh:mm')
    },
    getBtn (live){
      switch(live.liveStatus){
        case 0: if(live.isSignup===0) return '预约';
                else return '已预约';
        case 1: return '进入教室';
        case 2: if(live.recordingVideo>0) return '回看';
                else return '已结束';
      }
    },
    btnStyle (live){
        switch(live.liveStatus){
        case 0: return 0;
        case 1: return 1;
        case 2: if(live.recordingVideo>0) return 0;
                else return 2;
      }
    },
    "onLoading": function (e) {
      this.getNextPage();
    },
    //refresh下拉放手后的文字与图标
    "onRefresh": function (e) {
        this.refreshing = true;
        this.page = 1;
        this.getLives();
    },
    //refresh下拉放手前的文字与图标
    "onPullingdown": function (e) {
      this.refreshIcon = "icon-todown";
      this.refreshText = "下拉刷新...";
      //下拉一定距离时文字与图标
      if (Math.abs(e.pullingDistance) > 150) {
          this.refreshIcon = "icon-toup";
          this.refreshText = "松开即可刷新...";
      }
    },
    getNextPage () {
      this.showLoading = true;
      this.getLives();
    },
    liveTrigger (live) {
      if(live.liveStatus===0){
        this.bookLive(live)
      }
      else {
        this.toLive(live);
      }
    },
    bookLive (live) {
      if(live.isSignup===0){
          ajax({
            url : 'ba/api/live/appointment/attend',
            data : {
              id: live.infoId
            }
          }).then((res) =>{
            buiweex.toast('预约成功');
            live.appointmentCount++;
            live.isSignup = 1;
          },(errorT,status) =>{
            buiweex.toast('预约失败');
          })
        }
        else {
          ajax({
            url : 'ba/api/live/appointment/cancel',
            data : {
              id: live.infoId
            }
          }).then((res) =>{
            buiweex.toast('已取消预约');
            live.appointmentCount--;
            live.isSignup = 0;
          },(errorT,status) =>{
            buiweex.toast('取消预约失败');
          })
        }
    },
    toLive (live){
      buiweex.push(buiweex.getContextPath() + "/live.weex.js",{
        liveId : live.infoId
      })
    }
  }
}
</script>

<style scope>
.white-bg{
  border-top-style: solid;
  border-top-color: #dedede;
  border-top-width: 1px;
  background-color: white;
}
</style>

<style src="../../css/layout.css"></style>
<style src="../../css/loading.css"></style>
<style src="../../css/refresh.css"></style>
<style src="../../css/customer/null.css"></style>
<style src="../../css/customer/live-list.css"></style>