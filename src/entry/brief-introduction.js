import BriefIntroduction from '../views/modules/brief-introduction.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

BriefIntroduction.el = '#root'

new Vue(BriefIntroduction)
