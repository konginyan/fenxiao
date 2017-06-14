import MoreRecord from '../views/modules/more-record.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

MoreRecord.el = '#root'

new Vue(MoreRecord)