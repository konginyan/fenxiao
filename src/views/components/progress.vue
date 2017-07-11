<template>
  <div :style="wrapStyle">
    <div ref="progress" :style="progressStyle"></div>
  </div>
</template>

<script>
import {extend} from '../../js/tool.js';
export default {
  props : {
    max : {
      type : Number,
      default : 100
    },
    progress : {
      type : Number,
      default : 0
    },
    weight : {
      type : String,
      default : '8px'
    },
    color: {
      type: String,
      default: '#21b24b'
    },
    marginTop: {
      type : String,
      default : '0px'
    },
  },
  data () {
			return {
        timer: null,
        each: null,
        time: null,
        limit: null
      }
  },
  methods : {
    start(){
      extend(this, {id:'progress', width:350, duration:1000})
    },
  },
  computed : {
    progressStyle () {
      return {
        'height' : this.weight,
        'width' : (750 * this.progress / this.max) + 'px',
        'background-color' : this.color
      }
    },
    wrapStyle () {
      return {
        'flex': 1,
        'position': 'absolute',
        'width': '750px',
        'top': this.marginTop
      }
    }
  },
  mounted () {
    this.start();
  }
}
</script>


