<template>
  <div class="more-record-warp span1">
    <bui-header
      title="观看记录"
      :leftItem="leftItem"
      @leftClick = "back"
      >
    </bui-header>
    <list class="bui-list span1" >
      <refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
              :display="refreshing ? 'show' : 'hide'">
        <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
        <text class="bui-refresh-indicator">{{refreshText}}</text>
      </refresh>

      <cell :key="part" v-for="part in all">
        <div v-if="part.records.length > 0" class="record-list">
          <text class="record-time-title">{{part.title}}</text>
          
          <div :key="(record,index)" class="course-list" v-for="(record,index) in part.records">
            <div class="course-list-item no-border" 
                :class="[index===part.records.length-1?'no-border':'bb1']" 
                @click="linkDetail(record)">
              <div class="avatar-wrap">
                <bui-image class="default-pic" src="/image/no-pic.png"></bui-image>
                <bui-image class="course-item-img" :src="getPicture(record.picture)"></bui-image>
              </div>
              <div class="course-content">
                <text class="course-item-title">{{record.name}}</text>
                <text class="course-item-time">{{getRecordExt(record)}}</text>
              </div>
            </div>
          </div>
        </div>
      </cell>
      <loading class="bui-loading white-bg" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
        <text class="bui-loading-indicator">{{loadingText}}</text>
      </loading>
    </list>
  </div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import ajax from "../../js/ajax.js";
import {fixedPic, departUrl, getDateDiff, secondToTime, formatDate} from "../../js/tool.js";
var globalEvent = weex.requireModule('globalEvent');

export default {
  data () {
    return {
      leftItem: {
        icons: 'icon-back',
      },
      rightItem:{
        icons: 'icon-search',
      },
      all: [
        {
          title: '未来',
          records: [],
        },
        {
          title: '今天',
          records: [],
        },
        {
          title: '昨天',
          records: [],
        },
        {
          title: '此前一周',
          records: [],
        },
        {
          title: '更早',
          records: [],
        }
      ],
      page: 1,
      rows: 20,
      loadingText: "正在加载更多数据...",
      showLoading: false,
      placeholder: '/image/no-pic.png',
      noBorder: true,
      refreshing: false,
      refreshIcon: "icon-todown",
      refreshText: "下拉刷新...",
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
      this.refreshIcon = "icon-loadding";
	    this.refreshText = "正在刷新";
      ajax({
        url : 'ba/api/homepage/historyInfos',
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

        if(this.page===2) {
          this.all[0].records=[];
          this.all[1].records=[];
          this.all[2].records=[];
          this.all[3].records=[];
          this.all[4].records=[];                   
        }

        res.r.forEach((record)=>{
          let diff = getDateDiff(formatDate(record.time,'yyyy-MM-dd hh:mm:ss'));
          if(diff<0) this.all[0].records.push(record);
          else if(diff==0) this.all[1].records.push(record);
          else if(diff==1) this.all[2].records.push(record);
          else if(diff<=7) this.all[3].records.push(record);
          else this.all[4].records.push(record);
        })

        this.refreshIcon = "icon-checkbox-on";
        this.refreshText = "刷新成功";
        setTimeout(()=>{
          this.refreshing = false;
        },1000)
      },(errorT,status) =>{
        this.refreshing = false;
        this.refreshIcon = "icon-todown";
        this.refreshText = "刷新失败";
      })
    },
    getPicture (src) {
      return fixedPic(src) || this.placeholder;
    },
    "onLoading": function (e) {
      this.getNextPage();
    },
    //refresh下拉放手后的文字与图标
    "onRefresh": function (e) {
        this.refreshing = true;
        this.page = 1;
        this.getRecords();
    },
    //refresh下拉放手前的文字与图标
    "onPullingdown": function (e) {
      if(!this.refreshing){
        this.refreshIcon = "icon-todown";
        this.refreshText = "下拉刷新...";
      }
      //下拉一定距离时文字与图标
      if (Math.abs(e.pullingDistance) > 150) {
          this.refreshIcon = "icon-toup";
          this.refreshText = "松开即可刷新...";
      }
    },
    getNextPage () {
      this.showLoading = true;
      this.getRecords();
    },
    getRecordType (rec) {
      let obj = departUrl(rec.url);
      return obj.args[0].value;
    },
    getRecordExt (rec) {
      let type = this.getRecordType(rec);
      if(type === 'Live') return formatDate(rec.ext.startTime, '开始于 MM-dd hh:mm');
      if(type === 'Course') {
        if(rec.ext.duration === undefined) return '';
        if(rec.ext.duration === '-1') return '已学完';
        return '学习到' + secondToTime(rec.ext.duration);
      }
      return formatDate(rec.ext.regTime, '开始于 MM-dd hh:mm');      
    },
    linkDetail (rec) {
				let type = this.getRecordType(rec);
				if(type === 'Live') buiweex.push(buiweex.getContextPath() + "/live.weex.js",{
          liveId : rec.itemId
        });
				else if(type === 'Course') buiweex.push(buiweex.getContextPath() + "/micro-class-detail.weex.js",{
            		courseId : rec.itemId
            	});
				else buiweex.push(buiweex.getContextPath() + "/train.weex.js");
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
.record-time-title{
  margin-top: 64px;
  margin-left: 24px;
  font-size: 36px;
  margin-bottom: 24px;
}
.span1{
  flex : 1;
}

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
<style src="../../css/customer/course-list.css"></style>