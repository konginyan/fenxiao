import Student from '../views/modules/students.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

Student.el = '#root'

new Vue(Student)
