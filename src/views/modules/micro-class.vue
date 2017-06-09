<template>
	<div class="micro-class-wrap">
		<bui-header
                title="微课"
                :leftItem="leftItem"
                @leftClick = "back"
                @centerClick="showDemo"
               
                >
                <icon slot="right" name="icon-scan" size="45px" color="#ffffff" class="pdl10"></icon>
        </bui-header>
		 <bui-searchbar-left @onSearch="search"></bui-searchbar-left>
		<filter-bar :filterItems="filterItems" @change="filterChange"></filter-bar>
		
		<bui-content-scroll class="span1">
			<div class="course-list">
				<div class="course-list-item" v-for="item in 10">
					<bui-image class="course-item-img" src="/image/trailer-img.png"></bui-image>
					<div class="course-content">
						<text class="course-item-title">2017年政企事业部需求分析师交流分享会</text>
						<text class="course-item-text">51人学过</text>
						<rate @change="rateChange" :value="3" :disabled="true"></rate>
					</div>
				</div>
			</div>

		</bui-content-scroll>

		<filter-dialog v-if="isShow"  top="400px">
			<div slot="body">
				<div class="micro-class-type-wrap">
					<text class="micro-class-type">课程类型</text>
				</div>
				<div class="micro-class-filter">
					<button type="default" value="全部"  class="filter-btn"></button>
					<button type="default" value="操作系统"  class="filter-btn"></button>
					<button type="default" value="开发技术"  class="filter-btn"></button>
				</div>
				<div class="micro-class-filter">
					<button type="default" value="项目管理"  class="filter-btn"></button>
					<button type="default" value="需求分析"  class="filter-btn"></button>
					<button type="default" value="UI/UE"  class="filter-btn"></button>
				</div>
				<div class="micro-class-filter">
					<button type="default" value="售前"  class="filter-btn"></button>
					<button type="default" value="日常办公"  class="filter-btn"></button>
					<button type="default" value="规章制度"  class="filter-btn"></button>
				</div>

				
			</div>
			<div slot="foot">
				<div class="operation">
					<button type="normal" class="operation-btn" @click="confirm" value="重置筛选"></button>
					<button type="primary" class="operation-btn" @click="confirm" value="确定"></button>
				</div>
				
			</div>
		</filter-dialog>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import buiSearchbarLeft from '../../components/bui-searchbar-left.vue';
import filterBar from '../components/filter-bar.vue';
import rate from '../components/rate.vue';
import filterDialog from '../components/filter-dialog.vue';
var globalEvent = weex.requireModule('globalEvent');
var stream = weex.requireModule('stream');

	export default {
		data (){
			return {
				leftItem: {
                    icons: 'icon-back',
                },
                filterItems: [
                    {
                        index: 0,
                        title: '时间',
                        icon: 'icon-arrow',
                        selected: true,
                    },
                    {
                        index: 1,
                        title: '热门',
                        icon: 'icon-arrow',
                        selected: false,

                    },
                    {
                        index: 2,
                        title: '筛选',
                        icon: 'icon-filter',
                        selected: false,
                    },
                ],
                isShow : true,
                
			}
		},
		methods : {
			back () {
	            buiweex.pop();
	        },	
	        showDemo (){
	        	buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
	        },
	        search (val) {
	        	buiweex.toast(val);
	        },
	        filterChange (index){

	        	index === 2 && this.filter();
	        },
	        dialog (isShow) {
	        	
	        },
	        filter () {

	        	this.isShow = true;
	        },
	        confirm () {
	        	buiweex.toast(Math.random())
	        	this.isShow = false;
	        },
	        mask () {
	        	
	        },
	        rateChange (val){
	        	buiweex.toast(val);
	        },
		},
		created (){
	        // globalEvent.addEventListener("androidback", function (e){
	        //       buiweex.pop();
	        // });
	    },
	    components :{
	    	buiSearchbarLeft,
	    	filterBar,
	    	filterDialog,
	    	rate
	    }
	}
</script>
<style >
	.span1{
		flex: 1;
	}

</style>
<style src="../../css/layout.css"></style>
<style src="../../css/customer/micro-class.css"></style>
<style src="../../css/customer/course-list.css" />