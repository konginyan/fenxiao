import MicroClass from '../views/modules/micro-class.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

MicroClass.el = '#root'

new Vue(MicroClass)
