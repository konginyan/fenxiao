import Evaluate from '../views/modules/evaluate.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

Evaluate.el = '#root'

new Vue(Evaluate)