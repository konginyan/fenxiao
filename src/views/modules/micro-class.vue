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
		<filter-dialog @change="dialog" :isShow="isShow">
			<div slot="body">
				<text>bbb</text>
			</div>
			<div slot="foot">
				 <bui-button @click="confirm" type="primary" value="确定"></bui-button>
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
                isShow : false
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
	        	this.isShow = false;
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