<template>
	<div class="students-wrap">
		<bui-header title="报名的人" :leftItem="leftItem" @leftClick="back" @centerClick="showDemo">
		</bui-header>
		<bui-content class="span1">
			<!-- <list class="bui-list p-r">
				<refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
				         :display="refreshing ? 'show' : 'hide'">
				    <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
				    <text class="bui-refresh-indicator">{{refreshText}}</text>
				</refresh>
				<cell>
					<div class="bui-cell-large" v-for="item in users">
						<div class="bui-list-left">
							<bui-image class="bui-list-thumb" :src="getPicture(item.avatar,'uam')" radius="50px"></bui-image>
						</div>
						<div class="bui-list-main">
							<text class="bui-list-title">{{item.name}}</text>
							<text class="bui-list-subtitle">{{item.orgName}}</text>
						</div>
						<div class="bui-list-right">
							<bui-icon name="icon-go"></bui-icon>
						</div>
					</div>
				</cell>
				<loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
				    <text class="bui-loading-indicator">{{loadingText}}</text>
				</loading>
			</list> -->
			<list class="bui-list">
				<cell class="bui-cell-large" v-for="item in users">
					<div class="bui-list-left">
						<bui-image class="bui-list-thumb" :src="getPicture(item.avatar,'uam')" radius="50px"></bui-image>
					</div>
					<div class="bui-list-main">
						<text class="bui-list-title">{{item.name}}</text>
						<text class="bui-list-subtitle">{{item.orgName}}</text>
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
import {fixedPic} from "../../js/tool.js";
var globalEvent = weex.requireModule('globalEvent');
import ajax from '../../js/ajax.js';
import linkapi from '../../js/linkapi.js';
export default {
	data() {
		return {
			leftItem: {
				icons: 'icon-back',
			},
			list: [],
			users: [],
			refreshing: false,
            showLoading: false,
            refreshIcon: "icon-todown",
            refreshText: "下拉刷新...",
            loadingText: "正在加载更多数据...",
            page : 1,
            rows : 1000,
		}
	},
	mounted() {
		this.getList();
	},
	methods: {
		back() {
			buiweex.pop();
		},
		showDemo() {
			buiweex.push(buiweex.getContextPath() + "/app-view.weex.js");
		},
		onRefresh () {
			 this.refreshing = true;
             this.page = 1;
             this.getList();
		},
		onPullingdown () {
			//默认refresh文字与图标
			this.refreshIcon = "icon-todown";
			this.refreshText = "下拉刷新...";
			//下拉一定距离时文字与图标
			if (Math.abs(e.pullingDistance) > 80) {
			    this.refreshIcon = "icon-toup";
			    this.refreshText = "松开即可刷新...";
			}
		},
		onLoading () {
			this.getMore();
		},
		getList() {
			this.refreshIcon = "icon-loadding";
			this.refreshText = "正在刷新";
			ajax({
				url: 'ba/api/course/attend/list',
				data: {
					page: this.page,
					rows: this.rows,
					id: buiweex.getPageParams().courseId
				}
			}).then((res) => {
				let arrLearnBy = [];
				res.r.forEach(item=> {
					arrLearnBy.push(item.learnBy);
				})
				
				try{
					linkapi.getUserInfo(arrLearnBy,(res)=> {
						buiweex.alert(res)
						let obj = {
							url : res.picture,
							name : res.userName
						}
						
					},(err)=>{
						buiweex.alert(err);
					})
				}catch(e){
					buiweex.alert(e);
				}

				this.list = res.r;
				this.refreshIcon = "icon-checkbox-on";
        		this.refreshText = "刷新成功";
        		this.refreshing = false;
				this.getUsers();
			}, (errorT, status) => {
				this.refreshIcon = "icon-todown";
				this.refreshText = "刷新失败";
				this.refreshing = false;
			})
		},
		getMore () {
			this.showLoading = true;
	        this.page += 1;
			ajax({
				url: 'ba/api/course/attend/list',
				data: {
					page: this.page,
					rows: this.rows,
					id: buiweex.getPageParams().courseId
				}
			}).then((res) => {
				this.showLoading = false;
				if(res.r.length === 0){
					this.loadingText = '没有更多数据了';
					return;
				}else{
					this.loadingText = '正在加载更多数据...';
				}
				this.users = this.users.concat(res.r);
				this.getUsers();
			}, (errorT, status) => {
				this.page -= 1;
				this.showLoading = false;
			})
		},
		getProfile(id1) {
			ajax({
				url: 'uam/api/user/getUserById',
				data: {
					id: id1
				}
			}).then((res) => {
				// buiweex.alert(res);
				this.users.push(res.r);

			}, (errorT, status) => {
				
			})
		},
		getUsers() {
			for (let i = 0; i < this.list.length; i++) {
				this.getProfile(this.list[i].learnBy);
			}
		},
		getPicture(src) {
			let field = arguments[1];
			return fixedPic(src, field);
		},
	},
	created() {
		globalEvent.addEventListener("androidback", function (e) {
			buiweex.pop();
		});
	},
}
</script>
<style src="../../css/layout.css"></style>
<style src="../../css/refresh.css"></style>
<style src="../../css/loading.css"></style>
<style src="../../css/list.css"></style>
<style src="../../css/customer/students.css"></style>
