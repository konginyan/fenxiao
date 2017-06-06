import search from '../views/modules/search.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);
search.el="#root";
new Vue(search);