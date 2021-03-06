var navigator = weex.requireModule('navigator');
var mixins = {
    data: function () {
        return {}
    },
    components: {
        'bui-header': require('../components/bui-header.vue'),
        'bui-content': require('../components/bui-content.vue'),
        'bui-content-scroll': require('../components/bui-content-scroll.vue'),
        'bui-icon': require('../components/bui-icon.vue'),
        'bui-button': require('../components/bui-button.vue'),
        'bui-image': require('../components/bui-image.vue'),
        'icon' :  require('../components/icon.vue'),
        'button' : require('../views/components/button.vue'),
        'bg' : require('../views/components/bg.vue'),    
        'progress' : require('../views/components/progress.vue'),
    }
}

export default mixins;