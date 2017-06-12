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
				<div class="course-list-item" v-for="item in pageList">
					<bui-image class="course-item-img" :src="item.picture"></bui-image>
					<div class="course-content">
						<text class="course-item-title">{{item.name}}</text>
						<text class="course-item-text">{{item.learnCount}}人学过</text>
						<rate @change="rateChange" :value="item.score" :disabled="true"></rate>
					</div>
				</div>
			</div>

		</bui-content-scroll>

		<filter-dialog v-if="isShow"  top="180px">
			<div slot="body">
				<div class="micro-class-type-wrap">
					<text class="micro-class-type">课程类型</text>
				</div>
				<div class="micro-class-filter-list">
					<div class="micro-class-filter"  >
						<div class="micro-class-filter-item" v-for="(item,index) in filterList">
							<button  @click="filterBtn(item.name,index,item.categoryId)" type="default"  :value="item.name"  class="filter-btn" :class="[index === currentIndex ? 'filter-btn-active' : '']" ></button>
						</div>
						
						
					</div>
				</div>

				
			</div>
			<div slot="foot">
				<div class="operation">
					<button type="normal" class="operation-btn" @click="resetFilter" value="重置筛选"></button>
					<button type="primary" class="operation-btn" @click="confirm" value="确定"></button>
				</div>
				
			</div>
		</filter-dialog>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');
import ajax from '../../js/ajax.js';
import buiSearchbarLeft from '../../components/bui-searchbar-left.vue';
import filterBar from '../components/filter-bar.vue';
import rate from '../components/rate.vue';
import filterDialog from '../components/filter-dialog.vue';



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
                isShow : false,
                filterList : [],
                currentIndex : -1,
                pageList : [],
                type : 'time',
                categoryId : '',
                selectIndex : 0
                
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
	        	this.filterItems[this.selectIndex].selected = true;
	        },
	        mask () {
	        	
	        },
	        rateChange (val){
	        	buiweex.toast(val);
	        },
	        getFilterList () {
	        	ajax({
	        		url : 'api/course/category/list',
	        	}).then((res) =>{
	        		this.filterList = res.r;
	        		// buiweex.alert(res.r);
	        	},(errorT,status) =>{
	        		
	        	})
	        },
	        filterBtn (name,index,categoryId) {
	        	this.currentIndex = index;
	        	this.categoryId = categoryId;
	        },
	        resetFilter(){
	        	this.currentIndex = -1;
	        	this.categoryId = '';
	        },
	        getpagelist (type='time',categoryId='') {
            	ajax({
            		url : 'api/course/getpagelist',
            		data : {
            			categoryid : categoryId,
            			type : type,
            			rows : 10,
            			page : 1
            		}
            	}).then((res) =>{
            		
            		this.pageList = res.r;
            		
            	},(errorT,status) =>{
            		
            	})
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