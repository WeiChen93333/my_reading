<template>  
  <div id="main-part">    
    <!-- 一直显示 -->  
    <div class="button-box">
      <div class="text">
        <mo-button type="primary" size="wider" text="导入文本片段"
          @click.native="toggleTextInputBox"></mo-button>           
        <mo-button class="clear" type="primary" size="middle" text="取消输入"
          @click.native="cancelInput"></mo-button>  
        <mo-button class="clear" type="primary" size="middle" text="全部加入"
          @click.native="addAll"></mo-button>
        <mo-button class="clear" type="primary" size="wider" text="清空阅读区"
          @click.native="clearReadingZone"></mo-button>        
      </div>        
      <div class="words">
        <mo-button type="primary" size="middle" text="单词集"
          @click.native="toggleWordCollection"></mo-button>  
        <mo-button type="primary" size="middle" text="单词仓"
          @click.native="toggleWordBase"></mo-button>     
      </div>  
      <div class="mode">
        <mo-button type="primary" size="middle" text="释义模式"
          @click.native="switchToMeaningMode"
          :class="{active: mode=='meaning'}"></mo-button>  
        <mo-button type="primary" size="middle" text="例句模式"
          @click.native="switchToSentenceMode"
          :class="{active: mode=='sentence'}"></mo-button>     
      </div> 
    </div>
    <context-menu>
    <div class="content">
    <!-- 阅读区 -->
      <reading-zone 
        :textArr="textArr"         
        @clickSearch = "searchThroughDict"></reading-zone>
    <!-- 单词信息展示区 -->
      <word-info 
        :wordInfo="wordInfo"
        :sentenceInfo="sentenceInfo"
        :mode="mode"
        :currentWord="currentWord"
        ></word-info>
    </div>
    </context-menu>
    <!-- 点击按钮显示 -->
    <!-- 文本片段输入区 -->
    <text-input-box 
      v-if="textInputBoxVisible"
      v-model="newAdd"></text-input-box>
    <!-- 单词集展示区 -->
    <word-collection v-show="wordCollectionVisible" 
      @hideWordCollection="toggleWordCollection"
      @detailSearch = "searchThroughDict"
      :wordInfo="wordInfo"></word-collection>
    <!-- 单词仓展示区 -->
    <word-base v-if="wordBaseVisible"
      @hideWordBase="toggleWordBase"></word-base>      
  </div> 
</template>

<script>
import TextInputBox from './childComps/TextInputBox'
import ReadingZone from './childComps/ReadingZone'
import WordInfo from './childComps/WordInfo'
import WordCollection from './childComps/WordCollection'
import WordBase from './childComps/WordBase'

import { mapState } from 'vuex'
export default {
  name: 'MainPart',
  components: {   
    TextInputBox,
    ReadingZone,
    WordInfo,
    WordCollection,
    WordBase    
  },
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
      textStr: '',  //要展示在阅读区的文本
      newAdd: '',   //用户每次输入的文本         
      wordInfo: {},  //查询到的单词信息
      sentenceInfo: {
        total: 0,
        sentences: []
      }   //查询到的例句信息
    }
  },
  computed: {
    ...mapState(['readingText', 'wordCollection', 'searchHistory']),
    textArr(){      
      //为输入文本末尾加上一个换行, 就可同时包含一段和多段的情况      
      this.textStr = this.textStr.trim() + "\n"
      const reg = /.+\n/g
      let match = reg.exec(this.textStr) 
      const tempArr = []
      while(match){        
        tempArr.push(match[0].split(' '))
        match = reg.exec(this.textStr)       
      }    
      return tempArr 
    },
    currentWord(){ //当前要查询/展示的单词     
      if(this.searchHistory.length - 1 >= 0)
        return this.searchHistory[this.searchHistory.length - 1]       
    } 
  },
  watch: {
    textStr(){
      this.$store.commit('changeReadingText', this.textStr)
    },
    searchHistory(){
      this.searchThroughDict()
    }
  },
  created(){
    this.init()  
  },
  mounted(){
    //刷新或关闭页面前保存 store.state 的数据
    window.addEventListener('unload', this.saveState)

    //监听右键菜单释义/例句查询事件 (主要为了改变模式)
    this.$bus.$on('meaningSearch', value=>{
      this.mode = "meaning"
      this.$store.commit('addSearchHistory', value)
      this.searchThroughDict()
    })
    this.$bus.$on('sentenceSearch', value=>{
      this.mode = "sentence"
      this.$store.commit('addSearchHistory', value)
      this.searchThroughDict()
    })
    //监听 SentenceDisplay.vue 页面信息变更
    this.$bus.$on('pageInfoChanged', value=>{   
      this.queryInfo.pagenum = value.pagenum
      this.queryInfo.pagesize = value.pagesize 
      this.searchThroughDict()
    })
  },
  beforeDestroy(){
    this.$bus.$off('meaningSearch')
    this.$bus.$off('sentenceSearch')    
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

    //按钮功能
    //控制文本输入框
    toggleTextInputBox(){
      this.textInputBoxVisible = !this.textInputBoxVisible
      if(!this.textInputBoxVisible){
        this.textStr += this.newAdd
        this.newAdd = ''   
      }    
    },  
    //取消当前输入(清空文本)
    cancelInput(){
      this.newAdd = ''
      this.textInputBoxVisible = false
    },
    //全部加入单词集
    addAll(){
      this.$store.commit('addWord', this.textArr)
    },
    //清空阅读区
    async clearReadingZone(){
      const result = await this.$confirm('确定要清空阅读区吗?', '提示').catch(err => console.log(err))   
      if(result == 'confirm') return this.textStr = ''      
    },   

    //显示与隐藏单词集 单词仓
    toggleWordCollection(){
      this.wordCollectionVisible = !this.wordCollectionVisible
      if(this.wordCollectionVisible) this.mode = "meaning"
    },    
    toggleWordBase(){
      const userId = window.sessionStorage.getItem('userId')
      if(!userId) return this.$message.show('使用此功能需要登录')
      this.wordBaseVisible = !this.wordBaseVisible     
    }, 
    //切换释义/例句模式
    switchToMeaningMode(){
      this.mode = 'meaning'     
      if(this.currentWord) this.searchThroughDict()      
    },
    switchToSentenceMode(){
      this.mode = 'sentence'
      if(this.currentWord) this.searchThroughDict()         
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
#main-part
  width 100%
  height 600px    
  position relative
  .button-box
    height 60px   
    font-size 14px
    display flex
    justify-content space-between
    align-items center
    button 
      flex 1
      margin-left 5px
      &:first-child 
        margin 0
      &.active 
        background-color rgb(0, 28, 28)
  .content
    height 500px      
    display flex
      
    
   

 
        
</style>