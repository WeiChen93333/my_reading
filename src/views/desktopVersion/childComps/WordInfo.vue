<template>
  <div class="word-info">
    <div class="search-line"  @click.self="toggleSearchBox">
      <transition name="expand">
        <div class="search-box" v-if="searchBoxVisible">
          <input type="text" class="text" v-focus
            v-model="inputWord"
            @keyup.enter="inputSearch(inputWord)">
          <i class="iconfont icon-i-search" @click="inputSearch(inputWord)"></i>
        </div>
      </transition>      
    </div>   
    <template v-if="wordInfo">
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
  name: 'WordInfo',  
  props: ['wordInfo'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data(){
    return {
      searchBoxVisible: false,
      inputWord: ''
    }
  },
  directives: {
    focus: {
      inserted(el){       
        el.focus()
      }
    }
  },
  methods: {
    //控制搜索框的显示与隐藏
    toggleSearchBox(){
      this.searchBoxVisible = !this.searchBoxVisible    
    },
    //发送单词搜索事件至 ReadingZone
    inputSearch(inputWord){
      if(inputWord){
        this.$emit('inputSearch', inputWord)
        this.inputWord = ''
      }  
      this.searchBoxVisible = false
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.word-info
  flex 1
  height 100%
  overflow-y auto
  padding-left 10px
  padding-right 5px
  border 2px solid rgb(64, 128, 128) 
  background-color rgb(252, 252, 254) 
  .search-line
    border-top 2px solid #e1251b
    height 5px
    cursor pointer
    position relative     
    .expand-enter-active, .expand-leave-active
      transition top .5s ease
    .expand-enter, .expand-leave-to         
      top -30px  
    .expand-enter-to, .expand-leave          
      top 0
    .search-box
      width 100% 
      height 30px   
      position absolute          
      .text       
        width 90%
        height 100%
        line-height 28px
        padding-left 12px
        outline none
        border none 
        border-bottom 2px solid rgb(64, 128, 128) 
      .icon-i-search       
        display inline-block
        vertical-align top
        width 10%
        height 30px
        text-align center
        line-height 28px
        color white
        font-weight 700
        background-color rgb(64, 128, 128) 
        border-bottom 2px solid rgb(64, 128, 128)       
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