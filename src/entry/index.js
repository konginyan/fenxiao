import Index from '../views/modules/index.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

Index.el = '#root'

new Vue(Index)
