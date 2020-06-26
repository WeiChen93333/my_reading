<template>
  <div class="mo-form-item">
    <slot></slot>
    <p class="warning">{{warning}}</p>
  </div>
</template>

<script>
export default {
  name: 'MoFormItem',
  props: {
    warning: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-form-item
  width 100%
  height 40px
  margin-bottom 20px
  position relative
  .warning
    height 20px
    line-height 20px
    text-align center
    font-size 14px   
    color rgb(188, 100, 170)
</style>