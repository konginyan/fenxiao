<template>
    <div class="bui-scroller-tabbar-row" @click="onclickitem" :style="{'width': width}">
        <text v-if="type!='icon'" :style="{ 'color': titleColor,'font-size' : titleSize }" class="text" :class="[itemClass ? itemClass : '']" >{{title}}</text>
        <text class="actived" v-if="selected"></text>
    </div>
</template>

<style src="../css/tabbar.css"></style>
<script>

    module.exports = {
        props: {
            index: {default: 0},
            title: {default: ''},
            titleColor: {default: '#000000'},
            titleSize: {default:'25'},
            icon: {default: ''},
            backgroundColor: {default: '#ffffff'},
            selected: {default: false},
            scroll:{default:true},
            length: {},
            type:{default:'icon-text'}, //text,icon-text,icon
            itemClass : {
                type : String,
                default : ''
            }
        },
        methods: {
            onclickitem: function (e) {
                var params = {
                    index: this.index
                };

                this.$emit('tabItemOnClick', params);
            },
        },
        computed: {
            width: function(){
                if(this.scroll) return;
                var i = 750/this.length;
                return i;
            }
        }
    }
</script>
