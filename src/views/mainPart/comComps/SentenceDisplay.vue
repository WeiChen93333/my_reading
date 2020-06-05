<template>
  <div id="sentence-display">
    <p class="not-found" v-if="!sentenceInfo.length">没有匹配的例句</p>
    <template v-else>
      <div class="sentences">
        <p class="sentence" 
          v-for="(item, index) in sentenceInfo" :key="index"
          v-highlight="currentWord">{{item.sentence}}</p>
      </div>
      <mo-pagination class="pagination"
        :sizes="[5, 6, 7, 8]"
        :pageInfo="pageInfo"                
      ></mo-pagination> 
    </template> 
  </div>
</template>

<script>
export default {
  name: 'SentenceDisplay',
  props: {
    sentenceInfo: Array,
    currentWord: String  
  },
  data(){
    return {
      pageInfo: {
        word: '',
        pagenum: 1,
        pagesize: 5
      }          
    }
  },
  watch: {
    pageInfo: {
      handler(){        
        //向 MainPart.vue 发送事件, 通知页面信息已变更        
        this.$bus.$emit('pageInfoChanged', this.pageInfo)
      },
      deep: true
    } 
  }  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#sentence-display  
  height calc(100% - 5px)  
  font-size 16px
  .not-found
    height 30px
    line-height 30px
    text-align center
    color gray
    margin-top 120px 
  .sentences
    height calc(100% - 25px)  
    overflow-y auto
    .sentence
      font-size 15px          
      color gray   
      white-space pre-wrap  
      padding 5px   
      &:nth-child(odd)
        background-color rgba(173, 216, 230, .2)   
</style>