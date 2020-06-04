<template>
  <div id="reading-zone">   
    <p v-for="(item1, index1) in textArr" :key="index1">
    <span v-for="(item2, index2) in item1" :key="index2"
    @click="clickSearch(item2)"
    @dblclick="addToWordCollection(item2)">{{item2 + ' '}}</span>
  </p>   
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReadingZone',
  props: ['textArr'],
  computed: {
    ...mapState(['wordCollection'])
  },
  methods: {
    // 单击查词
    clickSearch(word){     
      this.$store.commit('addSearchHistory', word)     
    },    
    //将单词加入当前单词集
    addToWordCollection(word){
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
#reading-zone
  width 57%
  padding 10px
  border 2px solid rgb(64, 128, 128)
  border-right none
  background-color rgba(255, 255, 255, .5)  
  max-width 710px
  overflow-y auto 
  p 
    margin-bottom 10px
    line-height 22px   
  span
    cursor pointer
</style>