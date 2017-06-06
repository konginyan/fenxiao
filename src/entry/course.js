import Course from '../views/modules/course.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

Course.el = '#root'

new Vue(Course)