<template>
    <div :style="{ backgroundColor: backgroundColor }" class="bui-tabbar-item-container" @click="onclickitem">
        <icon v-if="type!='text'" :name="icon" class="bui-tabbar-icon" size="45px" :color="titleColor"
                  @click="onclickitem"></icon>     
        <text v-if="type!='icon'" :style="{ color: titleColor, 'font-size': titleSize }" class="bui-tabbar-text">{{title}}</text>
    </div>
</template>

<style src="../css/tabbar.css"></style>

<script>
    module.exports = {
        props: {
            index: {default: 0},
            title: {default: ''},
            titleColor: {default: '#000000'},
            titleSize: {default: '22'},
            icon: {default: ''},
            backgroundColor: {default: '#f7f7f7'},
            type: {default: 'icon-text'} //text,icon-text,icon
        },
        methods: {
            onclickitem: function (e) {
                var params = {
                    index: this.index
                };
                this.$emit('tabItemOnClick', params);
            }
        }
    }
</script>
