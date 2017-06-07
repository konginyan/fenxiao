import learningRecord from '../views/modules/learning-record.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

learningRecord.el = '#root'

new Vue(learningRecord)
