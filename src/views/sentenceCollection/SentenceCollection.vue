<template>
  <div id="sentence-collection">
    <p class="title">我的句集</p>
    <ul class="sentences">
      <li class="sentence" v-for="(item, index) in sentences" :key="index">
        <span class="order">{{index + 1}}</span>
        <p class="text">{{item}}</p>
      </li>
    </ul>
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
      const userId = window.localStorage.getItem('userId')
      const { data } = await this.$http('GET', '/userInfo', {params: {userId: userId}})
      this.sentences = data.sentences
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#sentence-collection
  .title 
    color blue
  .sentences
    .sentence    
      display flex
      .order         
        width 40px
      .sentence 
        flex 1

</style>