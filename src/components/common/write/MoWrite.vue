<template>
  <div class="mo-write">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'MoWrite' 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-write
  width 100%  
  padding 20px
  background-color lightgray 
  border-radius 10px   
  box-shadow 0 0 5px skyblue
</style>