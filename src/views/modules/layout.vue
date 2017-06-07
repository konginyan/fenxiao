<template>
    <div>
        <!--标题栏-->
       <!--  <bui-header
               :title="currentTab"
               :leftItem="leftItem"
               @centerClick="showDemo"
              
               >
               <icon @click="scan" slot="right" name="icon-scan" size="45px" color="#ffffff" class="pdl10"></icon>
       </bui-header> -->
        <!--选项卡内容-->
        <tabbar :tabItems="tabItems"
                    top="0" @tabItemOnClick="tabItemOnClick"></tabbar>
        
    </div>
</template>

<script>
    var buiweex = require("../../js/buiweex.js");
    var globalEvent = weex.requireModule('globalEvent');
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icons: 'icon-back',
                },
                // currentTab: "首页",
                tabItems: [
                    {
                        index: 0,
                        title: '首页',
                        icon: 'icon-home',
                        selected: false,
                        src: '/index.weex.js',
                        visibility: 'visible',
                    },
                    {
                        index: 1,
                        title: '岗位课程',
                        icon: 'icon-mycourse',
                        selected: false,
                        src: '/course.weex.js',
                        visibility: 'hidden',

                    },
                    {
                        index: 2,
                        title: '学习记录',
                        icon: 'icon-record',
                        selected: false,
                        src: '/learning-record.weex.js',
                        visibility: 'hidden',
                    },
                ]
                
            }
        },
        components: {
            'tabbar': require('../../components/tabbar.vue')
        },
        created: function () {
           for (var i = 0; i < this.tabItems.length; i++) {
               var path = this.tabItems[i].src;
               this.tabItems[i].src = buiweex.getContextPath() + path;
           }

        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            showDemo (){
                buiweex.push(buiweex.getContextPath() + "/app-view.weex.js",{"name":"qinzhou"});
            },
            scan () {
                
            },
            tabItemOnClick: function (e) {
                // buiweex.toast("tab" + e.index);
                //设置标题栏
                this.currentTab = this.tabItems[e.index].title;

            }
            
        }
    }
</script>
