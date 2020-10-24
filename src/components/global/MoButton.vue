<template>
  <button type="button" class="mo-button primary"
    :class="sizeChoice"
    v-if="type=='primary'">{{text}}</button> 
  <button type="button" class="mo-button negative"
    :class="sizeChoice"
    v-else-if="type=='negative'">{{text}}</button>
  <button type="button" class="mo-button vertical"
    :class="sizeChoice"
    v-else-if="type=='vertical'">{{text}}</button>
</template>

<script>
export default {
  name:'MoButton',  
  props: ['type', 'size', 'text', 'icon'],  
  computed: {
    sizeChoice(){
      return this.size
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-button
  border-radius 4px  
  cursor pointer
  &.small  
    width 56px
    height 32px
  &.middle
    width 80px
    height 40px
  &.wider
    width 100px
    height 40px
  &.vertical
    width 30px
.primary
  color white
  background-color rgba(0, 28, 58, .5)
  &:hover
    background-color rgb(0, 28, 28)
.negative      
  color #606266
  border 1px solid #DCDFE6
  margin-right 10px
  &:hover
    color #409EFF
    border-color #c6e2ff
    background-color #ecf5ff
</style>