<template>
  <div class="signUp-wrap">
    <bui-header
      title="报名的人"
      :leftItem="leftItem"
      @leftClick = "back"
      >
    </bui-header>
    <bui-content class="span1">
      <list class="bui-list">
          <cell class="bui-cell-large" v-for="item in users">
              <div class="bui-list-left">
                  <bui-image class="bui-list-thumb" radius="50px" :src="getPicture(item.avatar,'uam')"></bui-image>
              </div>
              <div class="bui-list-main">
                  <text class="bui-list-title">{{item.name}}</text>
                  <text class="bui-list-subtitle">{{item.orgName}}</text>
              </div>
              <div class="bui-list-right">
                  <bui-icon name="icon-go"></bui-icon>
              </div>
          </cell>
      </list>
   </bui-content>
  </div>
</template>

<script>
var iconDev = "/image/icon_dev.png";
var iconChat = "/image/icon_chat.png";
var iconKefu = "/image/icon_kefu.png";
var iconJifen = "/image/icon_jifen.png";

var globalEvent = weex.requireModule('globalEvent');
var buiweex=require("../../js/buiweex.js");

import {fixedPic} from "../../js/tool.js";
import ajax from "../../js/ajax.js";

export default {
  data () {
    return {
      leftItem: {
          icons: 'icon-back',
      },
      messageList: [
          {'l-icon': iconKefu, 'title': '在线客服', 'subtitle': '亲,使用过程中有任何问题可以联系我！'},
          {'l-icon': iconChat, 'title': 'SherryLee', 'subtitle': '请问，我们现在有北京国药的项目吗？'},
          {'l-icon': iconJifen, 'title': '积分商城', 'subtitle': '品高币积分变动提醒'},
          {'l-icon': iconChat, 'title': '吐槽群', 'subtitle': '赵文卓：明天下午吧，上午有个面试!'},
          {'l-icon': iconKefu, 'title': '播云客', 'subtitle': '五一特辑 | 劳动节无需劳动 | 优雅地吐槽你地工作还能领劳动节津贴'},
          {'l-icon': iconDev, 'title': '下一代开发平台', 'subtitle': '冯大大：Weex要快速上'},
          {'l-icon': iconKefu, 'title': '假勤', 'subtitle': '申请状态提醒[结束]'}
      ],
      list: [],
      users: []
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    back(){
      buiweex.pop();
    },
    getList(){
      ajax({
					url : 'ba/api/course/attend/list',
					data : {
						page : 1,
						rows : 10,
            id : '63742388-f363-4aaf-a3cd-9a154cc90e83'
					}
				}).then((res) =>{
					this.list = res.r;
          this.getUsers();
				},(errorT,status) =>{
					
				})
    },
    getProfile (id1) {
      ajax({
        url : 'uam/api/user/getUserById',
        data : {
          id : id1
        }
      }).then((res) =>{
        this.users.push(res.r);
        console.log(this.users);
      },(errorT,status) =>{

      })
    },
    getUsers () {
      console.log(this.list.length);
      for(let i=0;i<this.list.length;i++){
        this.getProfile(this.list[i].learnBy);
      }
    },
    getPicture (src) {
      let field = arguments[1];
      return fixedPic(src, field);
    },
  },
  created (){
    globalEvent.addEventListener("androidback", function (e){
        buiweex.pop();
    });
	}
}
</script>

<style src="../../css/list.css"></style>

<style>
.span1{
  flex: 1;
}
</style>
