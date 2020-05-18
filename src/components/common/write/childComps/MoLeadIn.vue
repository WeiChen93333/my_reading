<template>
  <div class="mo-lead-in">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'MoLeadIn' 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-lead-in
  width 700px
  padding 5px
  font-style italic
  color green
  border 2px solid gray
  margin-top 5px
  
</style>