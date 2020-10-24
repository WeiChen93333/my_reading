<template>
  <span class="mo-tag" :class="activeClass">
    <slot></slot>
    <i v-if="close" class="iconfont icon-RectangleCopy2"
      @click="closeTag"></i>
  </span>
</template>

<script>
export default {
  name:'MoTag',
  props: ['type', 'closeable'],
  computed: {
    activeClass(){
      return this.type      
    },
    close(){
      return this.closeable
    }    
  },
  methods: {
    closeTag(){
      this.$emit('closeTag')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-tag
  display inline-block
  height 32px
  padding 0 10px
  line-height 30px
  font-size 12px
  border-width 1px
  border-style solid
  border-radius 4px    
  white-space nowrap
  &.primary
    background-color #ecf5ff
    border-color #d9ecff  
    color #409EFF
  &.success
    background-color #f0f9eb
    border-color #e1f3d8
    color #67c23a
  &.warning
    background-color #fdf6ec
    border-color #faecd8
    color #e6a23c
  .iconfont
    display inline-block
    height 16px
    width 16px
    line-height 16px
    font-size 12px
    vertical-align middle     
    text-align center
    position relative
    top -1px
    right -5px 
    border-radius 50%
    cursor pointer   
    &:hover
      color #FFF
      background-color #e6a23c
    

  
</style>