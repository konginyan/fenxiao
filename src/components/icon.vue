<template>
    <text @click="_click($event)" class="iconfont" :style="{color: color, fontSize: size }" :ref="name">{{getFontName}}</text>
</template>

<script>
    var he = require("he");
    var animation = weex.requireModule("animation");
    module.exports = {
        props: {
            name: {
                type: String
            },
            color: {
                type: String,
                default: '#9ea7b4'
            },
            size: {
                type: String,
                default: '40px'
            }
        },
        computed:{
            //匹配对应的字体图标的unicode
            getFontName: function() {
                return he.decode(this.iconItems[this.name]);
            }
        },
        data: function () {
            return {

                iconItems:{
                    "icon-arrow": "&#xe613;",
                }
            }
        },
        methods: {
            "_click": function ($event) {
                this.$emit("click", $event);
            }
        },
        mounted: function () {
           
        },
        created: function () {
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily': 'iconfont',
                'src': "url(\'https://at.alicdn.com/t/font_k9rtdrsrx9ftj4i.ttf\')"
            });
        }
    }
</script>

<style src="../css/iconfont.css"></style>