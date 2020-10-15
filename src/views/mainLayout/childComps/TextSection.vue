<template>
  <div id="text-section">
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
    </div> 
    <div id="text-display">
      <p v-for="(item1, index1) in textArr" :key="index1">
        <span v-for="(item2, index2) in item1" :key="index2"
        @click="clickSearch(item2)"
        @dblclick="addToWordCollection(item2)">{{item2 + ' '}}</span>
      </p>    
    </div>  
    <TextInputBox      
      v-if="textInputBoxVisible"
      v-model="newAdd"    
    />
    <!-- <div class="test">
      <span>{{$t('common.home')}}</span>
    </div> -->
  </div>   
</template>

<script>
import TextInputBox from '@/components/common/TextInputBox'

import { mapState } from 'vuex'

export default {
  name: 'TextSection',
  components: { TextInputBox },
  props: [],
  data(){
    return {      
      textInputBoxVisible: false, 
      textStr: 'I love you too',  //要展示在阅读区的文本
      newAdd: '',   //用户每次输入的文本 
      confirm: false,  //控制确认框显示隐藏
      timer: null
    }
  },
  computed: {
    textArr(){      
      const tempArr = []        
      this.textStr = this.textStr.trim() + "\n" //文本末尾加一个换行, 同时包含一段和多段的情况   
      const reg = /.+\n/g
      let match      
      while(match = reg.exec(this.textStr)){        
        tempArr.push(match[0].split(' '))        
      }    
      return tempArr 
    },
    ...mapState(['wordCollection'])
  },
  methods: {
    //按钮区域(四个)
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
    
    //text-display 页面鼠标单双击操作
    // 单击查词    
    clickSearch(word){    
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{           
        this.$store.commit('addSearchHistory', word) 
      }, 200)     
    },    
    //将单词加入当前单词集
    addToWordCollection(word){
      clearTimeout(this.timer)
      //匹配字母和 ' , 去掉可能的标点符号、空格     
      const reg = /[a-zA-Z']+/     
      word = reg.exec(word)[0]
      if(this.wordCollection.includes(word)) return this.$message.show('该单词已经添加过')
      this.$store.commit('addWord', word)
      this.$message.show(`成功添加 ${word} 至单词集`)      
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#text-section
  position relative
  width 50%
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
  #text-display
    height 100%
    padding 10px
    border 2px solid rgb(64, 128, 128)
    border-right none
    background-color rgba(255, 255, 255, .5)  
    max-width 710px
    overflow-y auto 
    p 
    margin-bottom 10px
    line-height 22px   
    text-align justify    
    span
      cursor pointer
  
</style>