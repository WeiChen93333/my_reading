<template> 
  <div id="reading">
    <el-row>
      <el-col :span="12">
        <TextSection/>
      </el-col>        
      <el-col :span="12">
        <WordSection/>
      </el-col>    
    </el-row>      
  </div>
</template>

<script>
import TextSection from './childComps/TextSection'
import WordSection from './childComps/WordSection'

export default {
  name: 'ReadingZone',
  components: { 
    TextSection,
    WordSection
  },
  props: {},
  data(){
    return {
      //开关
      //文本片段输入框
      textInputBoxVisible: false, 
      //单词集 单词仓      
      wordCollectionVisible: false,
      wordBaseVisible: false,   
      //模式选择(释义/例句)
      mode: 'meaning',
      queryInfo: {
        word: '',
        pagenum: 1,
        pagesize: 5
      },
      //数据            
      newAdd: '',   //用户每次输入的文本         
      wordInfo: {},  //查询到的单词信息
      sentenceInfo: {
        total: 0,
        sentences: []
      }   //查询到的例句信息
    }
  }, 
  methods: {
    saveState() {
      window.localStorage.setItem('state', JSON.stringify(this.$store.state))
    },    

    //初始化时从 vuex 获取数据
    init(){     
      this.textStr = this.readingText
      if(this.currentWord) this.searchThroughDict(this.currentWord)
    },

    //在词典中查询单词
    async searchThroughDict(word){ // word 参数仅记忆卡片发送的查词事件携带
      if(this.mode == 'meaning'){
        const params = {
          word: this.currentWord
        }       
        params.word = word ? word.toLowerCase() : this.currentWord       
        const {data: meaningData} = await this.$http('GET', '/dict/words', { params })        
        this.wordInfo = this.$deepFreeze(meaningData)       
      }else if(this.mode == 'sentence'){      
        this.queryInfo.word = this.currentWord
        const {data: sentenceData} = await this.$http('GET', '/dict/sentences', {
          params: this.queryInfo
        })                
        this.sentenceInfo = this.$deepFreeze(sentenceData)        
      }   
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#reading  
  height 100%
  .el-row 
    height 100%
    .el-col 
      height 100%

</style>