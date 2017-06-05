<template>
    <div>
        <bui-header
                title="文本 h1 ~ h5"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <bui-content-scroll class="span1" padded="true">
            <div style="height:1800px">
                <div class="bui-panel">
                    <div class="bui-panel-main">
                        <text class="h1">h1...</text>
                    </div>
                </div>
                <div class="bui-panel">
                    <div class="bui-panel-main">
                        <text class="h2">h2...</text>
                    </div>
                </div>
                <div class="bui-panel">
                    <div class="bui-panel-main">
                        <text class="h3">h3...</text>
                    </div>
                </div>
                <div class="bui-panel">
                    <div class="bui-panel-main">
                        <text class="h4">h4...</text>
                    </div>
                </div>
                <div class="bui-panel">
                    <div class="bui-panel-main">
                        <text class="h5">h5...</text>
                    </div>
                </div>
            </div>
        </bui-content-scroll>
    </div>
</template>
<style src="../../css/layout.css"></style>
<style src="../../css/header.css"></style>
<style src="../../css/example.css"></style>
<style src="../../css/text.css"></style>
<script>
    var buiweex = require("../../js/buiweex.js");
    export default {
        data: function(){
            return{
                leftItem: {
                    icons: 'icon-back',
                },
            }
        },
        components: {
            'bui-tip': require('../../components/bui-tip.vue')
        },
        methods: {
            "back": function () {
                buiweex.pop();
            },
            "btnEvent": function (msg) {
                buiweex.toast(msg);
            }
        }
    }
</script>