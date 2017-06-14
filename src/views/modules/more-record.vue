<template>
  <div class="more-record-warp">
    <bui-header
      title="观看记录"
      :leftItem="leftItem"
      @leftClick = "back"
      >
    </bui-header>

    <!--<bui-content>
			<list class="bui-list">
				<cell class="record-list">
				   <div v-for="item in [1,2]" class="record-list-item">
	   					<text>6666666666666666666</text>
	   			</div>
				</cell>

        <cell class="record-list">
				   <div v-for="item in [1,2]" class="record-list-item">
	   					<text>6666666666666666666</text>
	   			</div>
				</cell>

				<loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
				    <text class="bui-loading-indicator">{{loadingText}}</text>
				</loading>
			</list>
		</bui-content>-->

    <bui-content-scroll>
      <list class="bui-list">
        <cell v-if="today.length > 0" class="record-list">
          <text class="record-time-title">今天</text>
          <div class="record-list-item" v-for="item in today">
            <bui-image class="record-item-pic" :src="getPicture(item.picture)"></bui-image>
            <text class="record-item-name">{{item.name}}</text>
            <text class="record-item-progress">已学到17分5秒</text>
          </div>
        </cell>
        <cell v-if="yesterday.length > 0" class="record-list">
          <text class="record-time-title">昨天</text>
          <div class="record-list-item" v-for="item in yesterday">
            <bui-image class="record-item-pic" :src="getPicture(item.picture)"></bui-image>
            <text class="record-item-name">{{item.name}}</text>
            <text class="record-item-progress">已学到17分5秒</text>
          </div>
        </cell>
        <cell v-if="lastweek.length > 0" class="record-list">
          <text class="record-time-title">此前一周</text>
          <div class="record-list-item" v-for="item in lastweek">
            <bui-image class="record-item-pic" :src="getPicture(item.picture)"></bui-image>
            <text class="record-item-name">{{item.name}}</text>
            <text class="record-item-progress">已学到17分5秒</text>
          </div>
        </cell>
        <cell v-if="before.length > 0" class="record-list">
          <text class="record-time-title">更早</text>
          <div class="record-list-item" v-for="item in before">
            <bui-image class="record-item-pic" :src="getPicture(item.picture)"></bui-image>
            <text class="record-item-name">{{item.name}}</text>
            <text class="record-item-progress">已学到17分5秒</text>
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
import {fixedPic, departUrl, getDateDiff} from "../../js/tool.js";
var globalEvent = weex.requireModule('globalEvent');

export default {
  data () {
    return {
      leftItem: {
        icons: 'icon-back',
      },
      future: [],
      today: [],
      yesterday: [],
      lastweek: [],
      before: [],
      page: 1,
      rows: 20,
      loadingText: "正在加载更多数据...",
      showLoading: false
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
        url : 'api/homepage/historyInfos',
        data : {
          page : this.page,
          rows : this.rows
        }
      }).then((res) =>{
        this.page += this.rows;
        this.showLoading = false;
        if(res.r.length === 0){
          this.loadingText = '没有更多数据了';
          return;
        }else{
          this.loadingText = '正在加载更多数据...';
        }

        res.r.forEach((record)=>{
          let diff = getDateDiff(record.time);
          if(diff<0) this.future.push(record);
          else if(diff<1) this.today.push(record);
          else if(diff<2) this.yesterday.push(record);
          else if(diff<8) this.lastweek.push(record);
          else this.before.push(record);
        })
      },(errorT,status) =>{
        
      })
    },
    getPicture (src) {
      return fixedPic(src);
    },
    "onLoading": function (e) {
        this.getNextPage();
    },
    getNextPage () {
      this.showLoading = true;
      this.getRecords();
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
  padding-left: 24px;
  padding-right: 24px;
}

.record-time-title{
  margin-top: 64px;
  font-size: 36px;
  margin-bottom: 30px;
}

.record-list-item{
  height: 310px;
  margin-bottom: 50px;
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

<style src="../../css/layout.css"></style>
<style src="../../css/loading.css"></style>