import video from '../views/modules/video.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);
video.el="#root";
new Vue(video);