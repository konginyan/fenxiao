<template>
    <div>
       
       <!--  <div class="tabcontent" style="flex:1">
            <tab-item tabId="tab1" :currentTab="currentTab">
                    <index style="flex:1"></index>
            </tab-item>
            <tab-item tabId="tab2" :currentTab="currentTab">
               <course style="flex:1;"></course>
           </tab-item>
             <tab-item tabId="tab3" :currentTab="currentTab">
                <learning-record style="flex:1;"></learning-record>
            </tab-item>
        </div>    -->

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
    const storage = weex.requireModule('storage')
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
            learningRecord
        },
        created: function () {
   

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
                    linkapi.getToken((e)=>{
                        storage.setItem('token', e.accessToken);
                    });
                }catch(e){
                    sso.login('13751876401','123456',function(res) {
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
            this.login();
        },
        
    }
</script>
