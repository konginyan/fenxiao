<template>
    <div>
       <div style="flex:1">
           
            <tab-item index="0" :currentTabIndex="currentTabIndex">
                 <index style="flex:1;width:750px;"></index>
            </tab-item>

            <tab-item index="1" :currentTabIndex="currentTabIndex">
                 <learning-record style="flex:1;width:750px;"></learning-record>
            </tab-item>
        </div>


        <tab :tabItems="tabItems"
            :currentTab="currentTab"
            @load="onTabLoad"
            @itemClick="onTabItemClick"></tab>

    </div>
</template>

<script>
    var buiweex = require("../../js/buiweex.js");
    var globalEvent = weex.requireModule('globalEvent');
    const storage = weex.requireModule('storage');
import {username,password} from '../../js/config.js';    
import sso from '../../js/sso.js';
import linkapi from '../../js/linkapi.js';
import tab from '../../components/tab.vue';
import tabItem from '../../components/tab-item.vue';
import index from '../modules/index.vue';
import learningRecord from '../modules/learning-record.vue';
import course from '../modules/course.vue';
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                currentTab : 'tab1',
                currentTabIndex: '0',
                tabItems: [
                    {
                        tabId: "tab1",
                        title: '首页',
                        icon: 'icon-home',
                    },
                  /* {
                        tabId: "tab2",
                        title: '岗位课程',
                        icon: 'icon-mycourse',

                    },*/
                    {
                        tabId: "tab3",
                        title: '学习记录',
                        icon: 'icon-record',
                    },
                ]
                
            }
        },
        components: {
            tab,
            tabItem,
            index,
            course,
            learningRecord,

        },
        created: function () {
            this.login();

        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            showDemo (){
                buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
            },
            scan () {
                
            },
            onTabLoad: function (tabId) {
                this.currentTab = tabId;
            },
            //选项卡点击事件,必须实现
            onTabItemClick: function (tabId,index) {
                this.currentTab = tabId;
                this.currentTabIndex=index;

            },

            login () {
                try{

                        linkapi.refreshToken(function(obj){
                            var newToken=obj.accessToken;
                            storage.setItem('token', newToken);
                            
                        },function(e){
                            buiweex.alert(e)
                        }); 

                    // linkapi.getToken((e)=>{
                    //     storage.setItem('token', e.accessToken);
                    // });
                }catch(e){

                    sso.login(username,password,function(res) {
                        var token = res['ex.oauth_access_token'];
                        storage.setItem('token', token);
                    },function(err) {
                        buiweex.toast(err);
                        console.log(err);
                    });
                }
                
                
            }
            
        },
        mounted () {
            
        },
        
    }
</script>
