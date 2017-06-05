<template>
	<div class="index-wrap">
		<bui-header
                title="头部"
                :leftItem="leftItem"
                @centerClick="jump"
                >
        </bui-header>
        <bui-searchbar-left @change="search"></bui-searchbar-left>
		<!-- <bui-image src="/image/applogo.png" style="width: 80px;height:80px;"></bui-image> -->


        <!--内容区域-->
        <bui-content class="span1">
             <bui-button class="ex-btn index-btn" @click="showDemo" value="示例"></bui-button>
        </bui-content>



		
	</div>
</template>

<script>
import buiweex from "../../js/buiweex.js";
import buiSearchbarLeft from '../../components/bui-searchbar-left.vue';
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
				buiweex.alert(val);
			}
		},
		components : {
			buiSearchbarLeft
		}
	}
</script>


<style src="../../css/customer/index.css" />

<style >

	.index-wrap{
		flex: 1;
		
	}
</style>
