<template>
	<div class="web-wrap">
		<web ref="webview" :src="url" style="flex:1;"></web>
	</div>
</template>
<script>
import buiweex from "../../js/buiweex.js";
const webview = weex.requireModule('webview');
	export default {
		data () {
			return {
				url : buiweex.getPageParams().url
			}
		}
	}
</script>