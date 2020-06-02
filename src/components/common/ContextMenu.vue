<template>
  <div id="context-menu-wrapper"
    @contextmenu.prevent="showContextMenu"
    @click="hideContextMenu"
    @mouseup="selectText">
    <slot></slot>
    <ul id="context-menu" v-show="ContextMenuVisible" v-getposition="mousePosition">
      <li v-for="(item, index) in menu" :key="index" @click="item.handler">{{item.content}}</li>        
    </ul>   
  </div>
</template>

<script>
// import { deepFreeze } from './deepFreeze.js'
import { mapState } from 'vuex'
export default {
  name: 'ContextMenu',  
  computed: {
    ...mapState(['wordCollection'])
  },
  data(){
    return {
      ContextMenuVisible: false,   
      menu: Object.freeze([
        {
          content: '查询释义',    
          handler: this.meaningSearch   
        },
        {
          content: '查询例句',
          handler: this.sentenceSearch   
        },
        {
          content: '添加到单词集',
          handler: this.addToWordCollection  
        },
        {
          content: '添加到句集',
          handler: this.addToSentenceCollection   
        }
      ]),
      mousePosition: {},
      selectedText: ''    
    }
  },
  directives:{
    getposition: {
      componentUpdated(el, binding){
        el.style.left = binding.value.x + 'px'     
        el.style.top = binding.value.y + 'px'          
      }
    }
  },
  methods: {
    showContextMenu(event){     
      this.mousePosition = {x: event.clientX, y: event.clientY} 
      this.ContextMenuVisible = true
    }, 
    hideContextMenu(){
      this.ContextMenuVisible = false
    },
    //选中文本内容
    selectText(){
      this.selectedText = window.getSelection().toString()     
    },
    meaningSearch(){
      if(!this.selectedText) return
      if(/\s/.test(this.selectedText)) return this.$message.show('请选择单词')
      this.$bus.$emit('meaningSearch', this.selectedText) 
    },
    sentenceSearch(){
      console.log('sentence')
    },
    addToWordCollection(){
      if(!this.selectedText) return
      if(/\s/.test(this.selectedText)) return this.$message.show('请选择单词')
      if(this.wordCollection.includes(this.selectedText)) return this.$message.show('该单词已经添加过')
      this.$store.commit('addWord', this.selectedText)
      this.$message.show(`成功添加 ${this.selectedText} 至单词集`)   
    },
    async addToSentenceCollection(){
      if(!this.selectedText) return  
      const userId = window.sessionStorage.getItem('userId')     
      const { data } = await this.$http('GET', '/userInfo', {params: {userId: userId}})       
      data.sentences.push(this.selectedText)       
      this.$http('POST', `/userInfo/update/${userId}`, {revisedSentenceCollection: data.sentences})       
    }

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#context-menu-wrapper
  #context-menu 
    padding 2px 0
    color black
    font-size 14px
    background-color white      
    border 1px solid lightgray
    position fixed
    z-index 1000
    li      
      height 24px   
      padding 5px 20px 
      user-select none
      &:hover 
        background-color lightgray
</style>