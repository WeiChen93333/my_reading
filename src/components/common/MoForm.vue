<template>
  <div class="mo-form" v-if="isShow"></div>
</template>

<script>
export default {
  name:'MoForm',
  components:{},
  props:{},
  data(){
    return {
      isShow: true
    }
  },
  computed:{},
  methods:{}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-form
  width 930px
  height 430px
  margin 0 auto
  position fixed
  top 150px
  left 0
  right 0
  
  
</style>
