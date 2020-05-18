<template>
  <div class="mo-pagination">
    <div class="total">共 {{total}} 条</div>
    <select class="sizes"
      :class="{focused: isfocused}"       
      @focus="isfocused=true"
      @blur="isfocused = false" 
      @click="handlePageSize($event.currentTarget.value)"    
      >
      <option>2条/页</option>
      <option selected>4条/页</option>
      <option>5条/页</option>
      <option>6条/页</option>
    </select>          
    <ul class="pages">
      <!-- 页码选择列表包含两个事件, 被动(与"queryInfo.pagenum"有关), 主动(点击事件) -->
      <li class="page" v-for="(item, index) in pages" :key="index"  
      :class="{active: item === currentPage}"         
      @click="handleCurrentPage(item)">{{item}}</li>
    </ul>
    <div class="jumper">
      <span>前往</span>
      <input class="target-page" type="text"       
      :value="value"
      @change="$emit('change', $event.target.value)">
      <span>页</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'MoPagination',
  model: {
    prop: 'value',
    event: 'change'
  },
  props:{
    //通过v-model传递的当前页码"queryInfo.pagenum"
    value: String,
    total: Number,
    pageSize: String    
  },
  data(){
    return {      
      isfocused: false,
      currentPage: parseInt(this.value)
    }
  },
  watch: {
    value(){
      this.currentPage = parseInt(this.value)
    }
  },
  computed: {
    //页码展示所需内容    
    pages(){      
      let pages = []
      let pageSize = parseInt(this.pageSize)
      let number = this.total % pageSize === 0 ? this.total / pageSize : parseInt(this.total / pageSize) + 1 
      for(let i = 1; i <= number; i++){
        pages.push(i)
      }
      return pages
    }    
  },
  methods:{
    //页码选择
    handleCurrentPage(page){      
      this.currentPage = page;
      let currentPage = page + '';
      this.$emit('changeCurrentPage', currentPage)      
    },
    //每页展示内容多少选择
    handlePageSize(value){      
      this.$emit('changePageSize', value)       
    }
  },  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-pagination
  height 25px
  color #909399
  margin-top 15px
  padding 0 5px
  display flex
  align-items center
  .sizes
    margin 0 20px
    width 110px
    &.focused
      border 1px solid rgb(102,177,255)
  .pages
    display flex     
    .page
      margin 0 10px
      width 15px
      font-weight 700
      text-align center
      cursor pointer
      &.active
        color rgb(102,177,255)
  .target-page
    width 30px
    text-align center
</style>