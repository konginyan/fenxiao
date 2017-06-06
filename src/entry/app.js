import App from '../views/modules/layout.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

App.el = '#root'

new Vue(App)
