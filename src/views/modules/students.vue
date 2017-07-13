<template>
	<div class="students-wrap">
		<bui-header title="报名的人" :leftItem="leftItem" @leftClick="back">
		</bui-header>
		<bui-content class="span1">
			<list class="bui-list p-r">
				<refresh class="bui-refresh" @refresh="onRefresh" @pullingdown="onPullingdown($event)"
				         :display="refreshing ? 'show' : 'hide'">
				    <bui-icon :name="refreshIcon" size="40px" style="margin-right: 5px;"></bui-icon>
				    <text class="bui-refresh-indicator">{{refreshText}}</text>
				</refresh>
				<cell  v-for="item in list">
					<div class="bui-cell-large" @click="startUserCard(item.userId)">
						<div class="bui-list-left">
							<bui-image width="54px" height="54px" @click="startUserCard(item.userId)" class="bui-list-thumb" :src="item.url" radius="50px" :placeholder="defaultAvatar"></bui-image>
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
				<!-- <cell class="bui-loading" v-if="showLoading">
                    <text class="bui-loading-indicator">{{loadingText}}</text>
                </cell> -->
				<!-- <loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
                    <text class="bui-loading-indicator" v-if="showLoading">{{loadingText}}</text>
                    <loading-indicator class="bui-indicator"></loading-indicator>
                </loading> -->
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
            rows : 100,
            defaultAvatar : '/image/icon-avatar.png'
		}
	},
	mounted() {
		this.getList();
	},
	methods: {
		back() {
			buiweex.pop();
		},
		onRefresh () {
			 this.refreshing = true;
             this.page = 1;
             this.getList();
		},
		onPullingdown (e) {
			//默认refresh文字与图标
			 if (!this.refreshing) {
                    this.refreshIcon = "icon-todown";
                    this.refreshText = "下拉刷新...";
                }
			//下拉一定距离时文字与图标
			if (Math.abs(e.pullingDistance) > 150) {
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

						let tempArr = [];
						res.forEach(item => {
							let obj = {
								url : item.picture || '',
								name : item.userName || '',
								userId : item.userId || '',
								orgName  : item.orgName || ''
							}
							tempArr.push(obj);
						})
						// buiweex.alert(tempArr)
						this.list = tempArr;
						this.refreshIcon = "icon-checkbox-on";
		        		this.refreshText = "刷新成功";
		        		setTimeout(()=>{
		            			this.refreshing = false;
		            		},500)
						
					},(err)=>{
						this.refreshIcon = "icon-todown";
						this.refreshText = "刷新失败";
						this.refreshing = false;
					})
				}catch(e){
					this.refreshIcon = "icon-todown";
					this.refreshText = "刷新失败";
					this.refreshing = false;
				}
				
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
				let arrLearnBy = [];
				res.r.forEach(item=> {
					arrLearnBy.push(item.learnBy);
				})
				
				try{
					linkapi.getUserInfo(arrLearnBy,(res)=> {
						let tempArr = [];
						this.showLoading = false;
						// buiweex.alert(arrLearnBy)
						res.forEach(item => {
							let obj = {
								url : item.picture || '',
								name : item.userName || '',
								userId : item.userId || ''
							}
							tempArr.push(obj);
						})

						if(tempArr.length === 0){
							this.loadingText = '没有更多数据了';
							return;
						}else{
							this.loadingText = '正在加载更多数据...';
						}
						this.list = this.list.concat(tempArr);
						
						
					},(err)=>{
						this.page -= 1;
						this.showLoading = false;
					})
				}catch(e){
					this.page -= 1;
					this.showLoading = false;
				}
				
				
			}, (errorT, status) => {
				this.page -= 1;
				this.showLoading = false;
			})
		},

		startUserCard (userId) {
			linkapi.startUserCard(userId);
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
<style src="../../css/list.css"></style>
<style src="../../css/customer/students.css"></style>
