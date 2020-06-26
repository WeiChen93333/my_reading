<template>
  <div class="mo-input">
    <span class="text">{{text}}: </span>
    <input :type="type" class="input"
      :class="{focused: isFocused}"      
      :value="value"
      @change="$emit('change', $event.target.value)"
      @focus="isFocused = true"      
      @blur="typingFinished($event)"
      @keyup.enter.prevent="typingFinished($event)"
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
    typingFinished(event){   
      this.isFocused = false   
      this.$emit('typingFinished', event)  
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