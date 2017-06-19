<template>
	<div class="students-wrap">
		<bui-header title="报名的人" :leftItem="leftItem" @leftClick="back" @centerClick="showDemo">
		</bui-header>
		<bui-content class="span1">
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
export default {
	data() {
		return {
			leftItem: {
				icons: 'icon-back',
			},
			list: [],
			users: []
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
		getList() {
			ajax({
				url: 'ba/api/course/attend/list',
				data: {
					page: 1,
					rows: 10,
					id: '63742388-f363-4aaf-a3cd-9a154cc90e83'
				}
			}).then((res) => {
				this.list = res.r;
				this.getUsers();
			}, (errorT, status) => {

			})
		},
		getProfile(id1) {
			ajax({
				url: 'uam/api/user/getUserById',
				data: {
					id: id1
				}
			}).then((res) => {
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
<style src="../../css/list.css"></style>
<style src="../../css/customer/students.css"></style>
