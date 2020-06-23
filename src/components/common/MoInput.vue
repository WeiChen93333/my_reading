<template>
  <div class="mo-input">
    <span class="text">{{text}}: </span>
    <input :type="type" class="input" ref="inputRef"
      :class="{focused: isFocused}"           
      @focus="isFocused = true" @blur="isFocused = false"
      :value="value"
      @change="$emit('change', $event.target.value)"
      @keyup.enter="moveFocus"
      >   
  </div>
</template>

<script>
export default {
  name:'MoInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value', 'text', 'type'],
  data(){
    return {     
      isFocused: false      
    }
  },
  methods: {
    moveFocus(e){
      const el = document.activeElement
      console.log(this.$refs.inputRef)
      //只能获取到"激活"(focus 状态) 的 input 元素; 大概是因为这个组件生成了多个实例, 要获取全部 input, 要到父组件里去
    }
  } 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~assets/css/mixin.stylus'
.mo-input  
  height 100%     
  display flex
  align-items center
  .text
    width 20%
    text-align right
    margin-right 10px
  .input 
    width 80%
    height 100%
    padding-left 10px
    border-radius 4px        
    input-box()          

</style>