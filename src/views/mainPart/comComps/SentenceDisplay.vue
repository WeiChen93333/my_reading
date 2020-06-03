<template>
  <div id="sentence-display">
    <p class="not-found" v-if="!sentenceInfo.length">没有匹配的例句</p>
    <div class="sentences">
      <p class="sentence" v-for="(item, index) in sentenceInfo" :key="index">{{item.sentence}}</p>
    </div>
    <mo-pagination class="pagination"      
      :page-size="queryInfo.pagesize"         
      v-model="queryInfo.pagenum"
      @changePageSize="changePageSize"
      @changeCurrentPage="changeCurrentPage"
      @change="changeCurrentPage"></mo-pagination>  
  </div>
</template>

<script>
export default {
  name: 'SentenceDisplay',
  components: {},
  props: ['sentenceInfo'],
  data(){
    return {
      queryInfo: {
        query: '',
        pagenum: '1',
        pagesize: '4条/页'
      }     
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
    //子组件点击pages区域更改当前页码时, 父组件修改queryInfo.pagenum
    changeCurrentPage(currentPage){
      this.queryInfo.pagenum = currentPage;
      this.getUserList()     
    },   
    //点击每页展示内容选择区域时, 父组件修改queryInfo.pagesize
    changePageSize(pageSize){
      this.queryInfo.pagesize = pageSize;
      this.getUserList()     
    },     
     
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#sentence-display
  position relative
  height calc(100% - 5px)  
  font-size 16px
  .not-found
    height 30px
    line-height 30px
    text-align center
    color gray
    margin-top 120px 
  .sentences
    overflow-y auto
    .sentence
      font-size 15px          
      color gray   
      white-space pre-wrap  
      padding 5px   
      &:nth-child(odd)
        background-color rgba(173, 216, 230, .2)   
  .pagination
    position absolute
    left 0
    bottom 0
</style>