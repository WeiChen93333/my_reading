<template>
  <div id="text-input-box" class="bg-lightgray">
    <textarea v-focus cols="30" rows="10" placeholder="在此处贴上文本片段, 然后点击导入或取消"
    :value="value"
    @change="$emit('change', $event.target.value)"></textarea>   
  </div>
</template>

<script>
export default {
  name: 'TextInputBox',
  model: {
    prop: 'value',
    event: 'change'
  }, 
  props: {
    value: String
  } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#text-input-box
  width 90% 
  height 400px  
  box-shadow 0 0 6px rgb(86,122,144)
  position absolute
  top 60px
  left 0
  textarea
    width 100%
    height 100%
    background-color lightgray
</style>