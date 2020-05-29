<template>
  <form class="mo-form" v-focus>
    <slot></slot>
  </form>  
</template>

<script>
export default {
  name:'MoForm' 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-form
  width 100%      
  padding 0 20px
  position absolute
  bottom 0
  color gray
  
</style>
