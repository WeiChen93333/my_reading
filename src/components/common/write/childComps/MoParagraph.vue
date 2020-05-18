<template>
  <p v-if="type == 'levelOne'" class="mo-paragraph level-one">
    >>> <slot></slot>    
  </p>
  <p v-else class="mo-paragraph level-two">
    <slot></slot>    
  </p>
</template>

<script>
export default {
  name:'MoParagraph',
  props: ['type']
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-paragraph  
  font-family Calibri, SongTi
  // white-space pre-wrap
  // word-wrap: break-word
  &.level-one
    height 30px
    line-height 30px
    font-size 16px 
  &.level-two    
    line-height 24px
    font-size 14px
    padding-left 10px
    color rgba(0, 0, 0, .8)
  
</style>