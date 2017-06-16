<template>
  <div class="more-record-warp">
    <bui-header
      title="观看记录"
      :leftItem="leftItem"
      @leftClick = "back"
      :rightItem="rightItem"
      >
    </bui-header>

    <bui-content-scroll>
      <list class="bui-list">
        <cell v-for="part in all">
          <div v-if="part.records.length > 0" class="record-list">
            <text class="record-time-title">{{part.title}}</text>
            <div class="course-list" v-for="(record,index) in part.records">
              <div class="course-list-item no-border" :class="[index===part.records.length-1?'no-border':'bb1']">
                <bui-image class="course-item-img" :src="getPicture(record.picture)"></bui-image>
                <div class="course-content">
                  <text class="course-item-title">{{record.name}}</text>
                  <text class="course-item-time">{{getRecordExt(record)}}</text>
                </div>
              </div>
            </div>
          </div>
        </cell>
        <loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
          <text class="bui-loading-indicator">{{loadingText}}</text>
				</loading>
      </list>
    </bui-content-scroll>
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
      noBorder: true
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
        url : 'ba/api/homepage/historyInfos',
        data : {
          page : this.page,
          rows : this.rows
        }
      }).then((res) =>{
        this.page += 1;
        this.showLoading = false;
        if(res.r.length === 0){
          this.loadingText = '没有更多数据了';
          return;
        }else{
          this.loadingText = '正在加载更多数据...';
        }

        res.r.forEach((record)=>{
          let diff = getDateDiff(formatDate(record.time,'yyyy-MM-dd hh:mm:ss'));
          if(diff<0) this.all[0].records.push(record);
          else if(diff==0) this.all[1].records.push(record);
          else if(diff==1) this.all[2].records.push(record);
          else if(diff<=7) this.all[3].records.push(record);
          else this.all[4].records.push(record);
        })
      },(errorT,status) =>{
        
      })
    },
    getPicture (src) {
      return fixedPic(src) || this.placeholder;
    },
    "onLoading": function (e) {
      this.getNextPage();
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
</style>

<style src="../../css/layout.css"></style>
<style src="../../css/loading.css"></style>
<style src="../../css/customer/course-list.css"></style>