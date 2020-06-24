<template>
  <div class="mo-form-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MoFormItem'  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-form-item
  width 100%
  height 40px
  margin-bottom 20px
  position relative
</style>