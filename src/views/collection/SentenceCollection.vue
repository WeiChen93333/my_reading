<template>
  <div id="sentence-collection">
    <p class="title">我的句集</p>
    <ul class="sentences">
      <li class="sentence" v-for="(item, index) in currentSentences" :key="index">
        <span class="order">{{index + 1}}</span>
        <p class="text">{{item}}</p>
        <i class="iconfont icon-close"
          ref="iconRef"         
          :key=item
          @click="removeSentence($event, item)"></i>
      </li>
    </ul>
    <mo-pagination 
      :total="total"
      :sizes="[5, 7, 8, 10]"
      :pageInfo="pageInfo"></mo-pagination>
  </div>
</template>

<script>
export default {
  name: 'SentenceCollection',  
  data(){
    return {
      //数据
      allSentences: [],
      total: 0,     
      pageInfo: {        
        pagenum: 1,
        pagesize: 5
      },
      //开关
      isActive: false

    }
  },
  computed: {
    //当前展示的句子
    currentSentences(){     
      const start = (this.pageInfo.pagenum-1)*this.pageInfo.pagesize
      const end = this.pageInfo.pagenum*this.pageInfo.pagesize   
      return this.allSentences.slice(start, end)
    }
  },
  created(){
    this.init()
  },
  methods: {
    async init(){
      const userId = window.sessionStorage.getItem('userId')
      const { data } = await this.$http('GET', '/userInfo', {params: {userId: userId}})
      this.allSentences = data.sentences
      this.total = this.allSentences.length
    },
    removeSentence(event, sentence){    
      const icons = this.$refs.iconRef
      const addCss = "color: red; font-size: 18px; font-weight: 700"
      if(!event.target.style.cssText.includes(addCss)){
        icons.forEach(item => {
          item.style.cssText -= addCss      
        })
        event.target.style.cssText += addCss
      }else{
        const userId = window.sessionStorage.getItem('userId')     
        const index = this.allSentences.indexOf(sentence);
        if (index !== -1){
        this.allSentences.splice(index, 1)            
        this.$http('POST', `/userInfo/update/${userId}`, {revisedSentenceCollection: this.allSentences})   
        }
      }      
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#sentence-collection
  width 100%
  height 100%
  padding 20px
  background-color white
  color black
  box-shadow 0 0 5px black inset
  .title 
    color rgb(86,122,144)
    font-weight 700
    margin-bottom 7px
  .sentences
    height calc(100% - 50px)  
    overflow-y auto
    .sentence    
      display flex     
      padding 5px 
      font-size 15px          
      color gray        
      &:nth-child(odd)
        background-color rgba(173, 216, 230, .2)  
      .order         
        flex 0 0 25px
      .text
        flex 1
      .iconfont
        flex 0 0 25px
        position relative      
        vertical-align middle
        cursor pointer
        &::before 
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
</style>