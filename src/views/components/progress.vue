<template>
  <div :style="wrapStyle">
    <div :style="progressStyle"></div>
  </div>
</template>

<script>
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
      default : '6px'
    },
    color: {
      type: String,
      default: '#B6EAFE'
    },
    config: {
      type: Array,
      default: [
        {each: 5, time: 10, limit: 40},
        {each: 1, time: 10, limit: 60},
        {each: 3, time: 10, limit: 100}
      ]
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
    load () {
      this.next(0);
    },
    run (each, time, limit) {
      this.each = each;
      this.time = time;
      this.limit = limit;
      return new Promise((resolve,reject)=>{
        this.timer = setInterval(()=>{
          this.progress += this.each;
          if(this.progress>=this.limit) {
            clearInterval(this.timer);
            resolve();
          }
        }, time)
      })
    },
    next (index){
      if(index<this.config.length){
        this.run(this.config[index].each,this.config[index].time,this.config[index].limit)
          .then(()=>{
            this.timer = null;
            if(this.progress>=this.max) {
              this.$emit('finish',this.max);
              console.log('finish')
            }
            else this.next(index+1);
          })
      }
    }
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
        'top': this.marginTop
      }
    }
  },
  mounted () {
    this.load();
  }
}
</script>

<style>
.progress-wrap{
  flex: 1;
  position: absolute;
  top: 0;
}
</style>


