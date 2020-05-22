<template>
  <div v-show="isShow" class="mo-message">{{message}}</div>
</template>

<script>
export default {
  name:'mo-message',  
  data(){
    return {
      message: '',
      isShow: false
    }
  },  
  methods:{
    show(message, duration=1000){
      this.message = message;
      this.isShow = true;      
      setTimeout(()=>{        
        this.isShow = false;
        this.message = ''
      }, duration)
    }
  }  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-message
  width 30%
  height 50px
  line-height 50px 
  font-size 16px
  color black
  text-align center
  position fixed
  top 25%
  left 0
  right 0  
  margin: 0 auto
  border-radius 4px
  background-color rgb(244, 242, 230)
</style>