<template>
  <div id="desktop">
    <div id="main">    
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
        <div class="login">
          <mo-button type="primary" size="middle" text="释义模式"
            ></mo-button>  
          <mo-button type="primary" size="middle" text="例句模式"
            ></mo-button>     
        </div> 
      </div>
      <div class="content">
      <!-- 阅读区 -->
        <reading-zone 
          :textArr="textArr"         
          @clickSearch = "searchThroughDict"></reading-zone>
      <!-- 单词信息展示区 -->
        <word-info @inputSearch = "searchThroughDict" :wordInfo="wordInfo"></word-info>
      </div>
      <!-- 点击按钮显示 -->
      <!-- 文本片段输入区 -->
      <text-input-box 
        v-show="textInputBoxVisible"
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
  </div>
</template>

<script>
import TextInputBox from './childComps/TextInputBox'
import ReadingZone from './childComps/ReadingZone'
import WordInfo from './childComps/WordInfo'
import WordCollection from './childComps/WordCollection'
import WordBase from './childComps/WordBase'
export default {
  name: 'DesktopVersion',
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
      
      //数据      
      textStr: '',  //要展示在阅读区的文本
      newAdd: '',   //用户每次输入的文本     
      wordInfo: {}  //查询到的单词信息    
    }
  },
  computed: {
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
    }
  },
  watch: {
    textStr(){
      window.localStorage.setItem('text', this.textStr)
    }
  },
  created(){
    const text = window.localStorage.getItem('text')
    if(text) this.textStr = text
    const wordCollection = window.localStorage.getItem('wordCollection')    
    if(wordCollection) this.$store.commit('restoreCollection', wordCollection)
  },
  methods: {
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
    },    
    toggleWordBase(){
      const userId = window.sessionStorage.getItem('userId')
      if(!userId) return this.$message.show('使用此功能需要登录')
      this.wordBaseVisible = !this.wordBaseVisible     
    }, 
    
    //处理子组件发送的事件
    //在词典中查询单词
    async searchThroughDict(word){  
      //匹配字母和 ' , 去掉可能的标点符号、空格     
      const reg = /[a-zA-Z']+/     
      word = reg.exec(word)[0].toLowerCase()     
      const {data} = await this.$http('GET', '/dict', {
        params: {
          word: word
        }
      })           
      this.wordInfo = data    
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#desktop
  width 60%
  min-width 880px
  padding 20px
  color green  
  background-color lightblue  
  margin 0 auto 
  margin-top 5%   
  #main
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
    .content
      height 500px      
      display flex
       
    
   

 
        
</style>