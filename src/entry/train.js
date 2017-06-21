import train from '../views/modules/train.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);
train.el="#root";
new Vue(train);