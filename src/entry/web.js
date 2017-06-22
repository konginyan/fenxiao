import Web from '../views/modules/web.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

Web.el = '#root'

new Vue(Web)