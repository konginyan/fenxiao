<template>
	<div class="micro-class-wrap">
		<bui-header
                title="微课"
                :leftItem="leftItem"
                @leftClick = "back"
                @centerClick="showDemo"
               
                >
                <icon @click="scan" slot="right" name="icon-scan" size="45px" color="#ffffff" class="pdl10"></icon>
        </bui-header>
		 <bui-searchbar-left @onSearch="search"></bui-searchbar-left>
		<filter-bar :filterItems="filterItems" @change="filterChange"></filter-bar>


		<filter-dialog v-if="isShow" @onMask="mask"  top="400px">
			<div slot="body">
				<div class="micro-class-type-wrap">
					<text class="micro-class-type">课程类型</text>
				</div>
				<div class="micro-class-filter">
					<button type="primary" class="filter-btn"></button>
					<button type="primary" plain="true" class="filter-btn"></button>
					<button type="danger" class="filter-btn"></button>
					<button type="danger" plain="true" class="filter-btn"></button>
					
					
					
				</div>
				<div class="micro-class-filter">
					<button type="info"  class="filter-btn"></button>
					<button type="info" plain="true" class="filter-btn"></button>
				</div>
				<div class="micro-class-filter">
					<button type="success"  class="filter-btn"></button>
					<button type="success" plain="true"  class="filter-btn"></button>
					<button type="warning" size="small" class="filter-btn"></button>
					<button type="warning" plain="true" size="small" class="filter-btn"></button>
					
				</div>
				<div class="micro-class-filter">
					<button type="default"  size="small" class="filter-btn"></button>
					<button type="default" plain="true"  class="filter-btn"></button>
					
					<button type="disabled" class="filter-btn"></button>
					<button type="disabled" plain="true" size="large" class="filter-btn"></button>
				</div>

				
			</div>
			<div slot="foot">
				<div class="operation">
					<button type="primary" class="confirm-btn" @click="confirm" value="确定"></button>
				</div>
				
			</div>
		</filter-dialog>
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import buiSearchbarLeft from '../../components/bui-searchbar-left.vue';
import filterBar from '../components/filter-bar.vue';
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
                isShow : true
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
	        	buiweex.toast(111);
	        	this.isShow = false;
	        	buiweex.toast(222);
	        },
	        mask () {
	        	buiweex.toast('mmm');
	        }
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	    components :{
	    	buiSearchbarLeft,
	    	filterBar,
	    	filterDialog
	    }
	}
</script>
<style src="../../css/customer/micro-class.css"></style>
<style src="../../css/customer/course-list.css" />