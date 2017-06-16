<template>
    <div class="bui-header-box" :style="{'height': height, 'background-color': backgroundColor,'background-image':backgroundImage}">
        <div :style="{ 'height': '30px' }" v-if="iosItem"></div>
        <div class="bui-header">
            <div class="bui-header-main" @click="_centerClick($event)">
                <text class="bui-header-title">{{title}}</text>
            </div>
            <div class="bui-header-left">
                <bui-icon @click="_leftClick($event)" v-if="leftItem.icons" :name="leftItem.icons" size="45px"
                          color="#ffffff" class="pdr10"></bui-icon>
                <text @click="_leftClick($event)" v-if="leftItem.text" class="bui-header-text">{{leftItem.text}}</text>
                <slot name="left"></slot>
            </div>
            <div class="bui-header-right">
                <bui-icon @click="_rightClick($event)" v-if="rightItem.icons" :name="rightItem.icons" size="45px"
                          color="#ffffff" class="pdl10"></bui-icon>
                <text @click="_rightClick($event)" v-if="rightItem.text" class="bui-header-text">{{rightItem.text}}
                </text>
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="sass" src="../css/header.scss"></style>

<script>
    var defaultItem = {
        icons: '',
        text: ''
    };
    module.exports = {
        data:function () {
          return {}
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            backgroundImage:{
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: '#4ca4fe'
            },
            leftItem: {
                type: Object,
                default: function () {
                    return defaultItem
                }
            },
            rightItem: {
                type: Object,
                default: function () {
                    return defaultItem
                }
            },
            ios: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
          return {
              height: '117px'
          }
        },
        computed: {
            iosItem: function () {
                var _this = this;
                if (!this.ios) {
                    _this.height = '100px';
                    return;
                }
                //头部位置适配
                var ios = false;
                var env = weex.config.env.platform.toLowerCase();
                switch (env) {
                    case "ios":
                        ios = true;
                        break;
                    case "android":
                        _this.height = '100px';
                        ios = false;
                        break;
                    case "web":
                        ios = false;
                        break;
                    default:
                        ios = false;
                }
                return ios;
            }
        },
        methods: {
            _leftClick: function ($event) {
                this.$emit('leftClick', $event);
            },
            _rightClick: function ($event) {
                this.$emit('rightClick', $event);
            },
            _centerClick: function ($event) {
                this.$emit('centerClick', $event);
            }
        }
    }
</script>

