<template>
  <div class="live-list-wrapper">
    <bui-header title="直播课堂"
      :leftItem="leftItem"
      @leftClick = "back"			
      >
    </bui-header>
    <bui-content class="span1">
      <list class="bui-list">
        <cell v-for="live in lives">
          <div class="live">
            <div class="live-detail">
              <bui-image class="live-img" :src="getPicture(live.picture)"></bui-image>
              <text class="live-name">{{live.name}}</text>
              <text class="live-book-count">{{getCount(live)}}</text>
            </div>
            <div class="live-bottom">
              <div>
                <text class="live-author-org">讲师</text>
                <text class="live-author-name">{{live.teacher}}</text>
              </div>
              <div style="flex-direction:row; align-items:center;">
                <bui-image v-if="!btnStyle(live)" class="onlive" src="/image/onlive.gif"></bui-image>
                <text class="live-book" v-if="!btnStyle(live)">正在直播</text>
                <text v-if="btnStyle(live)" class="live-time">{{getStartTime(live)}}</text>
                <div :class="[btnStyle(live)?'live-book-btn':'live-enter-btn']">
                  <text :class="[btnStyle(live)?'live-book':'live-enter']">{{getBtn(live)}}</text>
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
  </div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from "../../js/ajax.js";
import {fixedPic, departUrl, secondToTime, formatDate} from "../../js/tool.js";
export default {
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
          this.showLoading = false;
          return;
        }else{
          this.loadingText = '正在加载更多数据...';
        }
        this.showLoading = false;
        res.r.forEach((live)=>{
          this.lives.push(live);
        })
      },(errorT,status) =>{
        
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
        case 0: return '预约人数: ' + live.appointmentCount + '人';
        case 1: return '在线人数: ' + live.liveCount + '人';
        case 2: return '学习人数: ' + live.recordingCount + '人';
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
        case 2: return '回看';
      }
    },
    btnStyle (live){
        switch(live.liveStatus){
        case 0: return true;
        case 1: return false;
        case 2: return true;
      }
    },
    "onLoading": function (e) {
      this.getNextPage();
    },
    getNextPage () {
      this.showLoading = true;
      this.getLives();
    },
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
<style src="../../css/customer/live-list.css"></style>