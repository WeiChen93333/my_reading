<template>
  <div id="sentence-collection">
    <p class="title">我的句集</p>
    <ul class="sentences">
      <li class="sentence" v-for="(item, index) in sentences" :key="index">
        <span class="order">{{index + 1}}</span>
        <p class="text">{{item}}</p>
      </li>
    </ul>
    <mo-pagination 
      :sizes="[7, 8, 9, 10]"
      :queryInfo="queryInfo"></mo-pagination>
  </div>
</template>

<script>
export default {
  name: 'SentenceCollection',  
  data(){
    return {
      sentences: [],
      queryInfo: {        
        pagenum: 1,
        pagesize: 7
      }
    }
  },
  created(){
    this.init()
  },
  methods: {
    async init(){
      const userId = window.sessionStorage.getItem('userId')
      const { data } = await this.$http('GET', '/userInfo', {params: {userId: userId}})
      this.sentences = data.sentences
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#sentence-collection
  height 600px
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
      font-size 15px          
      color gray   
      white-space pre-wrap  
      padding 5px   
      &:nth-child(odd)
        background-color rgba(173, 216, 230, .2)  
      .order         
        flex 0 0 25px
      .sentence 
        flex 1
</style>