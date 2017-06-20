import liveList from '../views/modules/live-list.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);
liveList.el="#root";
new Vue(liveList);