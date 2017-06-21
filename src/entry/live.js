import live from '../views/modules/live.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);
live.el="#root";
new Vue(live);