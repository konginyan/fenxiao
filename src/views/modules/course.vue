<template>
	<div class="course-wrap">
		 <tab
                :tabItems="tabItems"
                :currentTab="currentTab"
                showSelectedLine="true"
                @load="onTabLoad"
                @itemClick="onTabItemClick">
        </tab>

		<div class="item-content" style="height: 100px;">
			
	        <!--选项卡内容-->
	        <tab-item tabId="tab1" :currentTab="currentTab" >
	        	<text>选项卡1</text>
	           
	        </tab-item>

	        <tab-item tabId="tab2" :currentTab="currentTab">
	            <text>选项卡2</text>
	        </tab-item>
		</div>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import tab from '../../components/tab.vue';
import tabItem from '../../components/tab-item.vue';
var globalEvent = weex.requireModule('globalEvent');

	export default {
		data () {
			return {
				//当前选择的tab
				currentTab: "",
				tabItems: [
				    {
				        tabId: "tab1",
				        title: "必修",
				    },
				    {
				        tabId: "tab2",
				        title: "选修"
				    }
				],
			}
		},
		mounted(){
			
		},
		methods:{
			back(){
				buiweex.pop();
			},
			 //选项卡加载完成事件,必须实现
            onTabLoad (tabId) {
                this.currentTab = tabId;
            },
            //选项卡点击事件,必须实现
            onTabItemClick(tabId) {
                this.currentTab = tabId;
            }
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components : {
	    	tab,
	    	tabItem
	    }
	}
</script>

<style src="../../css/customer/null.css"></style>
<style>
</style>
