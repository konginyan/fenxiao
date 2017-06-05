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
                    "icon-search": "&#xe623;",
                    "icon-radio": "&#xe66f;",
                    "icon-radio-on": "&#xe641;",
                    "icon-checkbox-on": "&#xe653;",
                    "icon-menu": "&#xe603;",
                    "icon-back": "&#xe60c;",
                    "icon-go": "&#xe608;",
                    "icon-book": "&#xe6a6;",
                    "icon-msg": "&#xe60e;",
                    "icon-user": "&#xe647;",
                    "icon-home": "&#xe617;",
                    "icon-add": "&#xe606;",
                    "icon-success": "&#xe600;",
                    "icon-video": "&#xe615;",
                    "icon-lishijilu": "&#xe601;",
                    "icon-star": "&#xe6a1;",
                    "icon-delete-little": "&#xe610;",
                    "icon-loadding": "&#xe7fa;",
                    "icon-delete": "&#xe612;",
                    "icon-toup": "&#xe602",
                    "icon-todown": "&#xe64f",
                    "icon-liwu": "&#xe685",
                    "icon-jiantou": "&#xe646",
                }
            }
        },
        methods: {
            "_click": function ($event) {
                this.$emit("click", $event);
            }
        },
        mounted: function () {
            if(this.name != "icon-loaddings") return;
            var domEl = this.$refs[this.name];
            animation.transition(domEl, {
                styles: {
                    transform: "rotate(360)",
                    transformOrigin: "center center"
                },
                duration: 100000,
                timingFunction: "linear"
            }, function () {

            })
        },
        created: function () {
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily': 'iconfont',
                'src': "url(\'https://at.alicdn.com/t/font_3ppcziztn5wpcik9.ttf\')"
            });
        }
    }
</script>

<style src="../css/iconfont.css"></style>