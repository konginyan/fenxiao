import Catalog from '../views/modules/catalog.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

Catalog.el = '#root'

new Vue(Catalog)
