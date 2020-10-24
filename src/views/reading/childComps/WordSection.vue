<template>
  <div id="word-section">
    <div class="button-group">           
      <el-button 
        type="primary"
        @click="switchToMeaningMode"
        :class="{active: mode=='meaning'}">
      Meaning</el-button>
      <el-button 
        type="primary"
        @click="switchToSentenceMode"
        :class="{active: mode=='sentence'}">
      Sentence</el-button>     
    </div>
    <div class="search"  @click.self="toggleSearchBox">
      <transition name="expand">
        <div class="search-box" v-if="searchBoxVisible">
          <input type="text" class="text" v-focus
            v-model="inputWord"
            @keyup.enter="inputSearch(inputWord)">
          <i class="iconfont icon-search" @click="inputSearch(inputWord)"></i>
        </div>
      </transition>      
    </div>
    <div class="info-display">
      <word-info-display
        class="word-info"
        v-if="mode=='meaning' && searchHistory.length"
        :wordInfo="wordInfo"></word-info-display>    
      <sentence-display
        v-if="mode=='sentence' && searchHistory.length"
        :sentenceInfo="sentenceInfo"
        :currentWord="currentWord"></sentence-display>     
    </div>      
  </div>  
</template>

<script>
import WordInfoDisplay from '../comComps/WordInfoDisplay'
import SentenceDisplay from '../comComps/SentenceDisplay'

import { mapState } from 'vuex'
export default {
  components: {
    WordInfoDisplay,
    SentenceDisplay
  }, 
  name: 'WordInfo',  
  props: {
    wordInfo: Object,
    sentenceInfo: Object
  },  
  data(){
    return {
      mode: 'Meaning',
      searchBoxVisible: false,
      inputWord: ''
    }
  },  
  computed: {
    ...mapState(['wordCollection', 'searchHistory']),
    currentWord(){ //当前要查询/展示的单词
      if(this.searchHistory.length - 1 >= 0)
        return this.searchHistory[this.searchHistory.length - 1]       
    }
  },
  methods: {
    //切换释义/例句模式
    switchToMeaningMode(){
      this.mode = 'meaning'     
      if(this.currentWord) this.searchThroughDict()      
    },
    switchToSentenceMode(){
      this.mode = 'sentence'
      if(this.currentWord) this.searchThroughDict()         
    },
    //控制搜索框的显示与隐藏
    toggleSearchBox(e){   
      this.searchBoxVisible = !this.searchBoxVisible    
    },
    //发送单词搜索事件
    inputSearch(inputWord){
      if(inputWord){
        this.$store.commit('addSearchHistory', inputWord)
        this.inputWord = ''
      }  
      this.searchBoxVisible = false
    }  
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#word-section
  .button-group 
    .el-button.active 
      background-color rgb(0, 28, 28)  
  .search
    position relative 
    border-top 2px solid #e1251b
    height 5px
    cursor pointer
    .expand-enter-active, .expand-leave-active
      transition all .3s ease-in-out
    .expand-enter, .expand-leave-to    
      opacity 0   
    .expand-enter-to, .expand-leave  
      opacity 1    
    .search-box
      width 100% 
      height 30px   
      position absolute     
      .text       
        width 90%
        height 30px
        line-height 28px
        padding-left 12px
        outline none
        border none 
        border-bottom 2px solid rgb(64, 128, 128) 
      .icon-search       
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
  .info-display
    padding-left 10px
    padding-right 5px
    border 2px solid rgb(64, 128, 128) 
    background-color rgb(252, 252, 254) 
    
</style>