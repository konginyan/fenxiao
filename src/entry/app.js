import App from '../views/modules/index.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

App.el = '#root'

new Vue(App)
