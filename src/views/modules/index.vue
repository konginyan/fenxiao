<template>
	<div class="index-wrap">
		<bui-header
                title="头部"
                :leftItem="leftItem"
                @centerClick="showDemo"
                >
        </bui-header>
        <bui-searchbar-left @onSearch="search"></bui-searchbar-left>
		<!-- <bui-image src="/image/applogo.png" style="width: 80px;height:80px;"></bui-image> -->
		
		<icon name="icon-arrow"></icon>
        <!--内容区域-->
        <bui-content class="span1">
             <bui-button class="ex-btn index-btn" @click="jump" value="跳转"></bui-button>
        </bui-content>



		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import buiSearchbarLeft from '../../components/bui-searchbar-left.vue';
import icon from '../../components/icon.vue';
var stream = weex.requireModule('stream');
	export default {
		data () {
			return {
				leftItem: {
                    icons: 'icon-back',
                },
			}
		},
		methods : {
			jump (){
				 buiweex.push(buiweex.getContextPath() + "/video.weex.js",{"name":"qinzhou"});
			},
			showDemo (){
				buiweex.push(buiweex.getContextPath() + "/app-view.weex.js",{"name":"qinzhou"});
			},
			search (val){
				stream.fetch({
		          method: 'GET',
		          type: 'json',
		          url: 'https://api.github.com/repos/' + 'alibaba/weex'
		        }, function (res) {
		        	buiweex.alert(res.data.stargazers_count)
		        })
			}
		},
		components : {
			buiSearchbarLeft,
			icon
		}
	}
</script>


<style src="../../css/customer/index.css" />

<style >

	.index-wrap{
		flex: 1;
		
	}
</style>
