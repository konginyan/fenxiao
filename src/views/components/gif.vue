<template>
  <div class="gif-wrap">
    <image class="gif" 
        :src="frames[index]" 
        :style="gifStyle" 
        :resize="resize"
				:placeholder="placeholder"></image>
  </div>
</template>

<script>
export default {
  props : {
    frames : {
      type : Array,
      default : []
    },
    frequency : {
      type : Number,
      default : 300
    },
    width : {
      type : String,
      default : '100px'
    },
    height : {
      type : String,
      default : '100px'
    },
    resize: {
      type: String,
      default: "stretch"
    },
    placeholder: {
      type: String
    },
  },
  data () {
    return {
      index: 0
    }
  },
  methods : {
    loop () {
      setInterval(()=>{
        if(this.index===this.frames.length-1)this.index = 0;
        else this.index ++;
      },this.frequency)
    }
  },
  computed : {
    gifStyle () {
      return {
        width : this.width,
        height : this.height
      }
    }
  },
  mounted () {
    this.loop();
  },
}
</script>

<style>
.gif-wrap{
		position: relative;
		left: 0;
		top: 0;
	}
</style>

