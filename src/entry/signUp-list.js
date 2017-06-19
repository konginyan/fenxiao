import signUp from '../views/modules/signUp-list.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);
signUp.el="#root";
new Vue(signUp);