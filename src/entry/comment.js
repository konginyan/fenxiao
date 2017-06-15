import Comment from '../views/modules/comment.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

Comment.el = '#root'

new Vue(Comment)
