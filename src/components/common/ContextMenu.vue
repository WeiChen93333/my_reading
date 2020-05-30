<template>
  <div id="context-menu-wrapper"
    @contextmenu.prevent="showContextMenu">
    <slot></slot>
    <ul id="context-menu" v-show="ContextMenuVisible">
      <li v-for="(item, index) in menu" :key="index">{{item.content}}</li>        
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',  
  props: {},
  data(){
    return {
      ContextMenuVisible: false,
      menu: [
        {
          content: '查询释义'
        },
        {
          content: '查询例句'
        },
        {
          content: '添加到单词集'
        },
        {
          content: '添加到句集'
        },
      ]
    }
  },
  computed: {},
  methods: {
    showContextMenu(){
      this.ContextMenuVisible = true
    },
    hideContextMenu(){
      this.ContextMenuVisible = false
    },
    meaningSearch(){
      console.log('meaning')
    },
    sentenceSearch(){
      console.log('sentence')
    },
    addToWordCollection(){
      console.log('add')
    },
    addToSentenceCollection(){
      console.log('add')
    }

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#context-menu-wrapper
  height 100%
  position relative  
  #context-menu   
    padding 2px 0
    color black
    font-size 14px
    background-color white      
    border 1px solid lightgray
    position absolute
    left 0
    top 0
    li      
      height 25px
      padding 5px 20px 
      user-select none
      &:hover 
        background-color lightgray
</style>