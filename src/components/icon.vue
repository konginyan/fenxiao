<template>
    <text @click="_click($event)" :style="{color: color, fontSize: size, 'font-family': 'iconfonts' }" :ref="name">{{getFontName}}</text>
</template>

<script>
    var he = require("he");
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
                    "icon-arrow": '&#xe613;',
                    'icon-scan' : '&#xe600;',
                    'icon-mycourse' : '&#xe667;',
                    'icon-record' : '&#xe837;',
                    'icon-home' : '&#xe601;',
                    'icon-star' : '&#xe63b;',
                    'icon-filter' : '&#xe69c;',
                    'icon-edu' : '&#xe653;',
                    'icon-download' : '&#xe6a3;',
                    'icon-play' : '&#xe614;',
                    'icon-loading' : '&#xe634;',
                    'icon-right' : '&#xe602;',
                    'icon-edit' : '&#xe71e;',
                    'icon-comment' : '&#xe604;',
                    'icon-more' : '&#xe603;',
                    'icon-plane' : '&#xe689;',
                    'icon-web' : '&#xe605;',
                    'icon-share' : '&#xe606;'
                    
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
                'fontFamily': 'iconfonts',
                'src': "url(\'https://at.alicdn.com/t/font_xwrzf8qhehm5nrk9.ttf\')"
            });
        }
    }
</script>
