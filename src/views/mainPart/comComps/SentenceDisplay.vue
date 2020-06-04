<template>
  <div id="sentence-display">
    <p class="not-found" v-if="!sentenceInfo.length">没有匹配的例句</p>
    <template v-else>
      <div class="sentences">
        <p class="sentence" v-for="(item, index) in sentenceInfo" :key="index">{{item.sentence}}</p>
      </div>
      <mo-pagination class="pagination"
        :queryInfo="queryInfo"                 
      ></mo-pagination> 
    </template> 
  </div>
</template>

<script>
export default {
  name: 'SentenceDisplay',
  components: {},
  props: {
    sentenceInfo: Array    
  },
  data(){
    return {
      queryInfo: {
        word: '',
        pagenum: 1,
        pagesize: 5
      }          
    }
  },
  watch: {
    queryInfo: {
      handler(){        
        console.log(this.queryInfo)
      },
      deep: true
    } 
  },
  computed: {},
  methods: {
    // async getUserList(){
    //   const {data: res} = await this.$http.get('users', {params: this.queryInfo}) 
    //   if(res.meta.status !== 200) return this.$message.show('获取用户列表失败')
    //   this.userList = res.data.users;
    //   this.total = res.data.total;
    //   this.addUserForm = {}         
    // },
    //处理子组件发送的事件
    // changePageSize(pagesize){
    //   console.log(pagesize)
    //   this.queryInfo.pagesize = pagesize     
    // },  
    // changeCurrentPage(pagenum){
    //   this.queryInfo.pagenum = pagenum        
    // }     
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#sentence-display  
  height calc(100% - 5px)  
  font-size 16px
  .not-found
    height 30px
    line-height 30px
    text-align center
    color gray
    margin-top 120px 
  .sentences
    height calc(100% - 25px)  
    overflow-y auto
    .sentence
      font-size 15px          
      color gray   
      white-space pre-wrap  
      padding 5px   
      &:nth-child(odd)
        background-color rgba(173, 216, 230, .2)   
  .pagination    
    left 0
    bottom 0
</style>