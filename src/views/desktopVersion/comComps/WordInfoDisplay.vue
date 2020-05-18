<template>
  <div id="word-info-display">
    <p class="not-found" v-if="!wordInfo">查 无 此 词</p>
    <template v-else>
      <div class="word">{{wordInfo.word}}</div>
      <div class="meaning"
        v-for="(item1, index1) in wordInfo.meanings" :key="index1">
        <p class="explanation">{{item1.explanation}}</p>
        <p class="sentence" :class="{property: item2.includes('[part of speech]')}"
          v-for="(item2, index2) in item1.sentences" :key="index2"
          >{{item2}}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'WordInfoDisplay',   
  props: ['wordInfo']
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#word-info-display
  font-size 16px
  .not-found
    height 30px
    line-height 30px
    text-align center
    color gray
    margin-top 120px
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