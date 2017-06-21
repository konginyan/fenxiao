<template>
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
