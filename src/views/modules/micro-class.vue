<template>
	<div class="micro-class-wrap">
		<bui-header
                title="微课"
                :leftItem="leftItem"
                @leftClick = "back"
                @centerClick="showDemo"
               
                >
        </bui-header>
		 <bui-searchbar-left ref="searchbar"  @onSearch="search" placeholder="请输入课程名"></bui-searchbar-left>
		<filter-bar :filterItems="filterItems" @change="filterChange"></filter-bar>
		
		<bui-content class="span1">
			<list class="bui-list p-r">
				<!--刷新组件-->
				<refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
				         :display="refreshing ? 'show' : 'hide'">
				    <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
				    <text class="bui-refresh-indicator">{{refreshText}}</text>
				</refresh>
				
				<cell class="course-list">
				   <div class="course-list-item" :class="[index===0?'no-border':'']" v-for="(item,index) in pageList" @click="linkDetail(item.courseId)">
				   		<div class="avatar-wrap">
				   			<bui-image class="default-pic" src="/image/no-pic.png" @click="linkDetail(item.courseId)"></bui-image>
	   						<bui-image width="295px" height="164px" @click="linkDetail(item.courseId)" class="course-item-img" :src="fixedPicture(item.picture)"></bui-image>
	   					</div>	
	   					<div class="course-content">
	   						<text class="course-item-title">{{item.name}}</text>
	   						
	   						<text class="course-item-text">{{item.learnCount}}人学过</text>
	   						<rate @change="rateChange" :value="item.score" :disabled="true"></rate>
	   					</div>
	   				</div>
	   				<prompt v-if="isShowPrompt" text="没有更多微课" src="/image/empty-micro.png"></prompt>
				</cell>

				<loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
				    <text class="bui-loading-indicator">{{loadingText}}</text>
				</loading>
			</list>
			<!-- <div class="course-list">
				<div class="course-list-item" v-for="item in pageList">
					<bui-image class="course-item-img" :src="item.picture"></bui-image>
					<div class="course-content">
						<text class="course-item-title">{{item.name}}</text>
						<text class="course-item-text">{{item.learnCount}}人学过</text>
						<rate @change="rateChange" :value="item.score" :disabled="true"></rate>
					</div>
				</div>
			</div>
			 -->
		</bui-content>

		<filter-dialog v-if="isShow"  top="180px">
			<div slot="body">
				<div class="micro-class-type-wrap">
					<text class="micro-class-type">课程类型</text>
				</div>
				<div class="micro-class-filter-list">
					
					<scroller  style="height: 500px;">
					  <div  class="micro-class-filter">
						<div class="micro-class-filter-item" v-for="(item,index) in filterList">
							<button  @click="filterBtn(item.name,index,item.categoryId)" type="default"  :value="item.name"  class="filter-btn" :class="[index === currentIndex ? 'filter-active' : '']" ></button>
						</div>
						</div>
					 </scroller>
						
					
				</div>

				
			</div>
			<div slot="foot">
				<div class="operation">
					<button type="normal" class="operation-btn" :class="[isSelected?'reset-btn-active':'']" @click="resetFilter" value="重置筛选"></button>
					<button type="primary" class="operation-btn" @click="confirm" value="确定"></button>
				</div>
				
			</div>
		</filter-dialog>
	</div>
</template>

<script>
import prompt from '../components/prompt.vue';
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');
import ajax from '../../js/ajax.js';
import buiSearchbarLeft from '../../components/bui-searchbar-left.vue';
import filterBar from '../components/filter-bar.vue';
import rate from '../components/rate.vue';
import filterDialog from '../components/filter-dialog.vue';
import {unicode,fixedPic} from '../../js/tool.js';


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
                        // icon: 'icon-arrow',
                        selected: true,
                    },
                    {
                        index: 1,
                        title: '热门',
                        // icon: 'icon-arrow',
                        selected: false,

                    },
                    {
                        index: 2,
                        title: '筛选',
                        icon: 'icon-filter',
                        selected: false,
                    },
                ],
                isShow : false,
                filterList : [],
                currentIndex : -1,
                pageList : [],
                type : 'time',
                categoryId : '',
                selectIndex : 0,
                refreshing: false,
                showLoading: false,
                refreshIcon: "icon-todown",
                refreshText: "下拉刷新...",
                loadingText: "正在加载更多数据...",
                page : 1,
                rows : 10,
                filterName : '筛选',
                keyword : '',
				isSelected : false,
				isShowPrompt : false
                
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
	        	// buiweex.toast(val);
	        	this.keyword = val.trim();
	        	ajax({
	        		url : 'ba/api/course/getpagelist',
	        		data : {
	        			keyword : unicode(this.keyword),
	        			type : this.type,
	        			rows : 100,
	        			page : 1

	        		}
	        	}).then((res) =>{
	        		this.pageList = res.r;
	        	},(errorT,status) =>{
	        		
	        	})
	        },
	        filterChange (index){
	        	switch (index){
	        		case 0 : this.type = 'time'; 
	        				 this.selectIndex = index;
	        				 break;
	        		case 1 : this.type = 'hot';
	        				 this.selectIndex = index;
	        				 break;
	        		case 2 : this.filter();
	        	}

	        	this.getpagelist(this.type,this.categoryId);
	        },
	        dialog (isShow) {
	        	
	        },
	        filter () {

	        	this.isShow = true;
	        },
	        confirm () {
	        	this.isShow = false;
	        	this.getpagelist(this.type,this.categoryId);
	        	this.filterItems[2].selected = false;
	        	this.filterItems[2].title = this.filterName;
	        	this.filterItems[this.selectIndex].selected = true;


	        },
	        mask () {
	        	
	        },
	        rateChange (val){
	        	buiweex.toast(val);
	        },
	        getFilterList () {
	        	
	        	ajax({
	        		url : 'ba/api/course/category/list',
	        	}).then((res) =>{
	        		this.filterList = res.r;
	        	},(errorT,status) =>{
	        		
	        	})
	        },
	        filterBtn (name,index,categoryId) {
	        	this.filterName = name;
	        	this.currentIndex = index;
	        	this.categoryId = categoryId;
						this.isSelected = true;
	        },
	        resetFilter(){
	        	this.filterName = '筛选';
	        	this.currentIndex = -1;
	        	this.categoryId = '';
						this.isSelected = false;
	        },
	        getpagelist (type='time',categoryId='',keyword = '') {
	        	this.refreshIcon = "icon-loadding";
	        	this.refreshText = "正在刷新";
            	ajax({
            		url : 'ba/api/course/getpagelist',
            		data : {
            			categoryid : categoryId,
            			type : type,
            			rows : this.rows,
            			page : 1,
            			keyword
            		}
            	}).then((res) =>{
            		this.pageList = res.r;
            		if (this.pageList.length ===0) {
            			this.isShowPrompt = true;
            		} else {
            			this.isShowPrompt = false;
            		}
            		this.refreshIcon = "icon-checkbox-on";
            		this.refreshText = "刷新成功";
            		setTimeout(()=>{
						this.refreshing = false;
						this.refreshIcon = "icon-todown";
						this.refreshText = "下拉刷新...";
					},500)
            	},(errorT,status) =>{
            		setTimeout(()=>{
						this.refreshing = false;
						this.refreshIcon = "icon-todown";
						this.refreshText = "刷新失败";
					},500)
            	})
            },
            getMorePageList (type='time',categoryId=''){
	        	this.showLoading = true;
	        	this.page += 1;
            	ajax({
            		url : 'ba/api/course/getpagelist',
            		data : {
            			categoryid : categoryId,
            			type : type,
            			rows : this.rows,
            			page : this.page
            		}
            	}).then((res) =>{
            		this.showLoading = false;
            		this.isShowPrompt = false;
            		if(res.r.length === 0){
            			this.loadingText = '没有更多数据了';
            			return;
            		}else{
            			this.loadingText = '正在加载更多数据...';
            		}
            		this.pageList = this.pageList.concat(res.r);
            		
            		
            	},(errorT,status) =>{
            		this.page -= 1;
            		this.showLoading = false;
            		
            	})
            },
            //refresh下拉放手后的文字与图标
            "onRefresh": function (e) {
                this.refreshing = true;
                this.page = 1;
                this.getpagelist(this.type,this.categoryId);
            },
            //refresh下拉放手前的文字与图标
            "onPullingdown": function (e) {
							this.refreshIcon = "icon-todown";
      				this.refreshText = "下拉刷新...";
              //下拉一定距离时文字与图标
							if (Math.abs(e.pullingDistance) > 80) {
									this.refreshIcon = "icon-toup";
									this.refreshText = "松开即可刷新...";
							}
            },

            "onLoading": function (e) {
                this.getMorePageList(this.type,this.categoryId);

            },
            fixedPicture (source) {
            	return fixedPic(source);
            },
            linkDetail (courseId) {
            	buiweex.push(buiweex.getContextPath() + "/micro-class-detail.weex.js",{
            		courseId : courseId
            	});
            }
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    mounted () {
	    	this.getFilterList();

	    	this.getpagelist();
	    },
	    components :{
	    	buiSearchbarLeft,
	    	filterBar,
	    	filterDialog,
	    	rate,
	    	prompt
	    },
	    
	}
</script>
<style >
	.span1{
		flex: 1;
	}

</style>
<style src="../../css/layout.css"></style>
<style src="../../css/customer/course-list.css"></style>
<style src="../../css/customer/micro-class.css"></style>


<style src="../../css/refresh.css"></style>
<style src="../../css/loading.css"></style>