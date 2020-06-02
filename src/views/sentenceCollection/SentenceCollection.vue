<template>
  <div id="sentence-collection">
    <p class="title">我的句集</p>
    <ul class="sentences">
      <li class="sentence" v-for="(item, index) in sentences" :key="index">
        <span class="order">{{index + 1}}</span>
        <p class="text">{{item}}</p>
      </li>
    </ul>
    <mo-pagination :total="1" pageSize="2"></mo-pagination>
  </div>
</template>

<script>
export default {
  name: 'SentenceCollection',  
  data(){
    return {
      sentences: []
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
  min-height 500px
  background-color white
  color black
  .title 
    color rgb(86,122,144)
    font-weight 700
    margin-bottom 5px
  .sentences
    .sentence    
      display flex
      .order         
        flex 0 0 25px
      .sentence 
        flex 1

</style>