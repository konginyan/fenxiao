import MicroClassDetail from '../views/modules/micro-class-detail.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

MicroClassDetail.el = '#root'

new Vue(MicroClassDetail)
