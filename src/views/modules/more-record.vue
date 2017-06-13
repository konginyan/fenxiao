<template>
  <div class="more-record-warp">
    <bui-header
      title="观看记录"
      :leftItem="leftItem"
      @leftClick = "back"
      >
    </bui-header>
    <bui-content-scroll>
      <div class="record-list">
        <text class="record-time-title">今天</text>
        <div class="record-list-item" v-for="item in records">
          <bui-image class="record-item-pic" :src="item.picture"></bui-image>
          <text class="record-item-name">BUI入门视频教程</text>
          <text class="record-item-progress">已学到17分5秒</text>
        </div>
      </div>
      <div class="record-list">
        <text class="record-time-title">昨天</text>
        <div class="record-list-item" v-for="item in records">
          <bui-image class="record-item-pic" :src="item.picture"></bui-image>
          <text class="record-item-name">BUI入门视频教程</text>
          <text class="record-item-progress">已学到17分5秒</text>
        </div>
      </div>
      <div class="record-list">
        <text class="record-time-title">此前一周</text>
        <div class="record-list-item" v-for="item in records">
          <bui-image class="record-item-pic" :src="item.picture"></bui-image>
          <text class="record-item-name">BUI入门视频教程</text>
          <text class="record-item-progress">已学到17分5秒</text>
        </div>
      </div>
      <div class="record-list">
        <text class="record-time-title">更早</text>
        <div class="record-list-item" v-for="item in records">
          <bui-image class="record-item-pic" :src="item.picture"></bui-image>
          <text class="record-item-name">BUI入门视频教程</text>
          <text class="record-item-progress">已学到17分5秒</text>
        </div>
      </div>
    </bui-content-scroll>
  </div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from "../../js/ajax.js";
var globalEvent = weex.requireModule('globalEvent');

export default {
  data () {
    return {
      leftItem: {
        icons: 'icon-back',
      },
      records: []
    }
  },
  mounted(){
    this.getRecords();
  },
  methods:{
    back(){
      buiweex.pop();
    },
    getRecords () {
      ajax({
        url : 'api/course/gethottestlist'
      }).then((res) =>{
        this.records = res.r;
      },(errorT,status) =>{
        
      })
    }
  },
  created (){
    globalEvent.addEventListener("androidback", function (e){
          buiweex.pop();
    });
  },
}
</script>

<style scope>
.record-list{
  padding-top: 64px;
  padding-left: 24px;
  padding-right: 24px;
}

.record-time-title{
  font-size: 36px;
  margin-bottom: 30px;
}

.record-list-item{
  height: 310px;
  margin-bottom: 112px;
}

.record-item-pic{
  width: 702px;
  height: 251px;
}

.record-item-name{
  font-size: 28px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.record-item-progress{
  font-size: 24px;
  color: #9B9B9B;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>