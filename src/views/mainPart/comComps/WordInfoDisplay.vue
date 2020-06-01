<template>
  <div id="word-info-display"  v-backtotop>
  <p class="not-found" v-if="!wordInfo">查 无 此 词</p>
  <div class="word-info-container" v-else>
    <div class="word">{{wordInfo.word}}</div>
    <div class="meaning"
      v-for="(item1, index1) in wordInfo.meanings" :key="index1">
      <p class="explanation">{{item1.explanation}}</p>
      <p class="sentence" :class="{property: item2.includes('[part of speech]')}"
        v-for="(item2, index2) in item1.sentences" :key="index2"
        >{{item2}}</p>
    </div>
  </div>
 
  </div>
</template>

<script>
export default {
  name: 'WordInfoDisplay',   
  props: ['wordInfo'], 
  directives: {
    backtotop: {
      componentUpdated(el){       
        el.scrollTop = 0      
      }
    }
  }  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#word-info-display
  height calc(100% - 5px)  
  overflow-y auto
  font-size 16px
  .not-found
    height 30px
    line-height 30px
    text-align center
    color gray
    margin-top 120px  
  .word-info-container  
    .word
      height 30px
      line-height 30px
      font-weight 700
    .explanation, .sentence
      font-size 15px          
      color gray   
      white-space pre-wrap
    .explanation
      background-color rgba(173, 216, 230, .2)
      padding 5px  
    .sentence
      padding 5px 
      padding-bottom 0
      &:last-child
        padding-bottom 5px
    .property 
      background-color lightyellow    
      border-top 2px green dotted
      margin-top 5px
      & ~ p
        background-color lightyellow
</style>