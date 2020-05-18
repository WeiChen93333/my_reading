<template>
  <h1 v-if="type == 'levelOne'" class="mo-headline level-one">
    <slot></slot>
  </h1>
  <h2 v-else class="mo-headline level-two">
    => <slot></slot>
  </h2>
</template>

<script>
export default {
  name:'MoHeadline',  
  props: ['type'] 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-headline
  font-weight normal
  border-radius 10px
  margin 5px 0  
  &.level-one
    width 400px   
    height 40px        
    line-height 40px
    font-size 30px
  &.level-two
    height 40px    
    line-height 40px
    font-size 20px
    
    
</style>