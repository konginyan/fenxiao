<template>
	<div class="students-wrap">
		<bui-header
                title="报名的人"
                :leftItem="leftItem"
                @leftClick = "back"
                @centerClick="showDemo"
               
                >
        </bui-header>
		<bui-content class="span1">
            <list class="bui-list">
                <cell class="bui-cell-large" v-for="item in 10">
                    <div class="bui-list-left">
                        <bui-image class="bui-list-thumb" radius="50px" src="/image/icon_kefu.png"></bui-image>
                    </div>
                    <div class="bui-list-main">
                        <text class="bui-list-title">陈梅</text>
                        <text class="bui-list-subtitle">技术管理部</text>
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
import buiweex from "../../js/buiweex.js";
var globalEvent = weex.requireModule('globalEvent');
import ajax from '../../js/ajax.js';
	export default {
		data () {
			return {
				leftItem: {
                    icons: 'icon-back',
                },
			}
		},
		methods : {
			back(){
				buiweex.pop();
			},
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
			},
		},
		created (){
	        globalEvent.addEventListener("androidback", function (e){
	              buiweex.pop();
	        });
	    },
	}
</script>
<style src="../../css/layout.css"></style>
<style src="../../css/list.css"></style>
<style src="../../css/customer/students.css"></style>
