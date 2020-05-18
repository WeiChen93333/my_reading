<template>
  <div class="breadcrumb">
    <span>首页</span>
    <i class="iconfont icon-right"></i>
    <span>{{second}}</span>
    <i class="iconfont icon-right"></i>
    <span>{{third}}</span>  
  </div>
</template>

<script>
export default {
  name:'Breadcrumb',
  props: ['second', 'third']

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.breadcrumb
  height 14px
  font-size 14px
  line-height 14px 
  color gray
  & :first-child
    color black 
    font-weight 700
  .iconfont    
    font-size 14px
    margin 0 5px
</style>