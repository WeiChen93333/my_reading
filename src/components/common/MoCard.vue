<template>
  <div class="mo-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'MoCard'
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-card  
  padding 20px
  border-radius 2px
  background-color white
  margin-top 15px
  
</style>