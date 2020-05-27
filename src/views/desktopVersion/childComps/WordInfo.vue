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
    <word-info-display :wordInfo="wordInfo"></word-info-display>   
    
  </div>
</template>

<script>
import WordInfoDisplay from '../comComps/WordInfoDisplay'
export default {
  name: 'WordInfo',  
  props: ['wordInfo'],
  components: {
    WordInfoDisplay
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
    //发送单词搜索事件
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
  overflow hidden
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
    
</style>