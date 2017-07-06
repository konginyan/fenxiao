<!-- <template>
    <div v-if="tabId==currentTab" style="flex:1;">
        <slot></slot>
    </div>
</template>

<script>
    module.exports = {
        props: {
            tabId:{},
            currentTab:{}
        }
    }
</script>
 -->


<template>
    <div v-bind:style="{ 'position': 'absolute', 'top':'0px', 'left':left, 'right': 0,'bottom':0}">
        <slot></slot>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                left: 0,
            }
        },
        watch: {
            currentTabIndex: function () {
                if (this.index == this.currentTabIndex) {
                    this.left = 0;
                } else {
                    this.left = this.width;
                }
            }
        },
        props: {
            index: {},
            currentTabIndex: {},
            height:{ },
            width:{ default: 750}
        },
        methods: {},
        created: function () {
            if (this.index == 0) {
                this.left = 0;
            } else {
                this.left =  this.width;
            }
        }
    }
</script>
