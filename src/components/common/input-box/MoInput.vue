<template>
  <div class="mo-input">
    <input type="text" placeholder="请输入内容" class="query"      
      :class="{focused: isFocused}"           
      @focus="isFocused = true" @blur="isFocused = false"
      :value="value"
      @change="$emit('change', $event.target.value)">
    <button type="button" class="search" @click="$emit('searchUser')">
      <i class="iconfont icon-i-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  name:'MoInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value'],
  data(){
    return {     
      isFocused: false     
    }
  } 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~assets/css/mixin.stylus'
.mo-input
  width 510px
  height 40px      
  display flex
  .query
    width 450px
    padding-left 10px  
    line-height 38px  
    border-top-left-radius 4px
    border-bottom-left-radius 4px          
    input-box()         
  .search
    width 60px
    border 1px solid lightgray
    border-left none
    border-top-right-radius 4px
    border-bottom-right-radius 4px
    background-color rgb(245,247,250)
    cursor pointer
</style>